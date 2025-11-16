import { z } from 'zod';
import { router, organizationProcedure, operatorProcedure } from '../trpc/trpc';
import { TRPCError } from '@trpc/server';

export const checkoutRouter = router({
  // Create checkout (equipment rental)
  create: operatorProcedure
    .input(
      z.object({
        itemId: z.string(),
        projectId: z.string().optional(),
        quantity: z.number().min(1).default(1),
        expectedReturn: z.date(),
        checkOutCondition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED']),
        checkOutNotes: z.string().optional(),
        checkOutPhotos: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get the item
      const item = await ctx.prisma.inventoryItem.findFirst({
        where: {
          id: input.itemId,
          organizationId: ctx.organizationId,
        },
      });

      if (!item) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Inventory item not found',
        });
      }

      if (item.availableQuantity < input.quantity) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: `Insufficient quantity. Available: ${item.availableQuantity}, Requested: ${input.quantity}`,
        });
      }

      // Validate project if provided
      if (input.projectId) {
        const project = await ctx.prisma.project.findFirst({
          where: {
            id: input.projectId,
            organizationId: ctx.organizationId,
          },
        });

        if (!project) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Project not found',
          });
        }
      }

      // Create checkout and update inventory in a transaction
      const [checkout] = await ctx.prisma.$transaction([
        ctx.prisma.checkOut.create({
          data: {
            ...input,
            organizationId: ctx.organizationId,
            checkedOutBy: ctx.session.user.id,
          },
          include: {
            item: { select: { id: true, name: true, sku: true } },
            project: { select: { id: true, name: true } },
            checkedOutUser: { select: { id: true, name: true, email: true } },
          },
        }),
        ctx.prisma.inventoryItem.update({
          where: { id: input.itemId },
          data: {
            availableQuantity: { decrement: input.quantity },
            inUseQuantity: { increment: input.quantity },
            status: 'IN_USE',
          },
        }),
      ]);

      // Create audit log
      await ctx.prisma.inventoryAuditLog.create({
        data: {
          itemId: input.itemId,
          action: 'CHECKED_OUT',
          userId: ctx.session.user.id,
          changes: {
            quantity: input.quantity,
            expectedReturn: input.expectedReturn,
            projectId: input.projectId,
          },
        },
      });

      return checkout;
    }),

  // Process return
  return: operatorProcedure
    .input(
      z.object({
        checkoutId: z.string(),
        returnCondition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED']),
        returnNotes: z.string().optional(),
        returnPhotos: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const checkout = await ctx.prisma.checkOut.findFirst({
        where: {
          id: input.checkoutId,
          organizationId: ctx.organizationId,
          status: { in: ['ACTIVE', 'OVERDUE'] },
        },
        include: {
          item: true,
        },
      });

      if (!checkout) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Active checkout not found',
        });
      }

      // Update checkout and inventory in transaction
      const [updatedCheckout] = await ctx.prisma.$transaction([
        ctx.prisma.checkOut.update({
          where: { id: input.checkoutId },
          data: {
            returnCondition: input.returnCondition,
            returnNotes: input.returnNotes,
            returnPhotos: input.returnPhotos,
            returnedBy: ctx.session.user.id,
            returnedAt: new Date(),
            status: 'RETURNED',
          },
          include: {
            item: { select: { id: true, name: true, sku: true } },
            project: { select: { id: true, name: true } },
            checkedOutUser: { select: { id: true, name: true } },
            returnedUser: { select: { id: true, name: true } },
          },
        }),
        ctx.prisma.inventoryItem.update({
          where: { id: checkout.itemId },
          data: {
            availableQuantity: { increment: checkout.quantity },
            inUseQuantity: { decrement: checkout.quantity },
            condition: input.returnCondition,
            ...(input.returnCondition === 'DAMAGED' && {
              damagedQuantity: { increment: checkout.quantity },
              status: 'DAMAGED',
            }),
            ...(input.returnCondition !== 'DAMAGED' && {
              status: 'AVAILABLE',
            }),
          },
        }),
      ]);

      // Create audit log
      await ctx.prisma.inventoryAuditLog.create({
        data: {
          itemId: checkout.itemId,
          action: 'CHECKED_IN',
          userId: ctx.session.user.id,
          changes: {
            returnCondition: input.returnCondition,
            checkoutId: input.checkoutId,
          },
        },
      });

      return updatedCheckout;
    }),

  // Get active checkouts
  getActive: organizationProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;

      const [checkouts, total] = await Promise.all([
        ctx.prisma.checkOut.findMany({
          where: {
            organizationId: ctx.organizationId,
            status: { in: ['ACTIVE', 'OVERDUE'] },
          },
          include: {
            item: { select: { id: true, name: true, sku: true } },
            project: { select: { id: true, name: true } },
            checkedOutUser: { select: { id: true, name: true, email: true } },
          },
          skip,
          take: limit,
          orderBy: { expectedReturn: 'asc' },
        }),
        ctx.prisma.checkOut.count({
          where: {
            organizationId: ctx.organizationId,
            status: { in: ['ACTIVE', 'OVERDUE'] },
          },
        }),
      ]);

      return {
        checkouts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),

  // Get overdue checkouts
  getOverdue: organizationProcedure.query(async ({ ctx }) => {
    const now = new Date();

    // First update any active checkouts that are now overdue
    await ctx.prisma.checkOut.updateMany({
      where: {
        organizationId: ctx.organizationId,
        status: 'ACTIVE',
        expectedReturn: { lt: now },
      },
      data: { status: 'OVERDUE' },
    });

    const overdue = await ctx.prisma.checkOut.findMany({
      where: {
        organizationId: ctx.organizationId,
        status: 'OVERDUE',
      },
      include: {
        item: { select: { id: true, name: true, sku: true } },
        project: { select: { id: true, name: true } },
        checkedOutUser: { select: { id: true, name: true, email: true } },
      },
      orderBy: { expectedReturn: 'asc' },
    });

    return overdue;
  }),

  // Extend return date
  extend: operatorProcedure
    .input(
      z.object({
        checkoutId: z.string(),
        newExpectedReturn: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const checkout = await ctx.prisma.checkOut.findFirst({
        where: {
          id: input.checkoutId,
          organizationId: ctx.organizationId,
          status: { in: ['ACTIVE', 'OVERDUE'] },
        },
      });

      if (!checkout) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Active checkout not found',
        });
      }

      const updated = await ctx.prisma.checkOut.update({
        where: { id: input.checkoutId },
        data: {
          expectedReturn: input.newExpectedReturn,
          status: 'ACTIVE', // Reset to active if was overdue
        },
      });

      return updated;
    }),

  // Get checkout history for item
  getItemHistory: organizationProcedure
    .input(z.object({ itemId: z.string() }))
    .query(async ({ ctx, input }) => {
      const history = await ctx.prisma.checkOut.findMany({
        where: {
          itemId: input.itemId,
          organizationId: ctx.organizationId,
        },
        include: {
          project: { select: { id: true, name: true } },
          checkedOutUser: { select: { id: true, name: true } },
          returnedUser: { select: { id: true, name: true } },
        },
        orderBy: { checkedOutAt: 'desc' },
      });

      return history;
    }),

  // Get checkout statistics
  getStatistics: organizationProcedure.query(async ({ ctx }) => {
    const [
      totalActive,
      totalOverdue,
      totalReturned,
      recentCheckouts,
    ] = await Promise.all([
      ctx.prisma.checkOut.count({
        where: {
          organizationId: ctx.organizationId,
          status: 'ACTIVE',
        },
      }),
      ctx.prisma.checkOut.count({
        where: {
          organizationId: ctx.organizationId,
          status: 'OVERDUE',
        },
      }),
      ctx.prisma.checkOut.count({
        where: {
          organizationId: ctx.organizationId,
          status: 'RETURNED',
        },
      }),
      ctx.prisma.checkOut.findMany({
        where: { organizationId: ctx.organizationId },
        orderBy: { checkedOutAt: 'desc' },
        take: 10,
        include: {
          item: { select: { name: true } },
          checkedOutUser: { select: { name: true } },
        },
      }),
    ]);

    return {
      totalActive,
      totalOverdue,
      totalReturned,
      recentCheckouts,
    };
  }),
});
