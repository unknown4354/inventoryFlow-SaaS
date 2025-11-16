import { z } from 'zod';
import { router, organizationProcedure, managerProcedure } from '../trpc/trpc';
import { TRPCError } from '@trpc/server';

export const projectRouter = router({
  // List projects with pagination
  list: organizationProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        search: z.string().optional(),
        status: z.enum(['PLANNING', 'EQUIPMENT_READY', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED']).optional(),
        clientId: z.string().optional(),
        startDateFrom: z.date().optional(),
        startDateTo: z.date().optional(),
        sortBy: z.enum(['name', 'startDate', 'endDate', 'createdAt', 'estimatedValue']).default('startDate'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, status, clientId, startDateFrom, startDateTo, sortBy, sortOrder } = input;
      const skip = (page - 1) * limit;

      const where = {
        organizationId: ctx.organizationId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { location: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
        ...(status && { status }),
        ...(clientId && { clientId }),
        ...(startDateFrom && { startDate: { gte: startDateFrom } }),
        ...(startDateTo && { startDate: { lte: startDateTo } }),
      };

      const [projects, total] = await Promise.all([
        ctx.prisma.project.findMany({
          where,
          include: {
            client: { select: { id: true, name: true } },
            _count: {
              select: {
                inventoryItems: true,
                checkOuts: true,
                tasks: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
        }),
        ctx.prisma.project.count({ where }),
      ]);

      return {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),

  // Get single project by ID
  getById: organizationProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.id,
          organizationId: ctx.organizationId,
        },
        include: {
          client: true,
          inventoryItems: {
            include: {
              item: {
                select: {
                  id: true,
                  name: true,
                  sku: true,
                  status: true,
                  condition: true,
                },
              },
            },
          },
          checkOuts: {
            orderBy: { checkedOutAt: 'desc' },
            include: {
              item: { select: { id: true, name: true, sku: true } },
              checkedOutUser: { select: { id: true, name: true } },
            },
          },
          tasks: {
            orderBy: { createdAt: 'desc' },
            include: {
              assignee: { select: { id: true, name: true } },
            },
          },
          invoices: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              invoiceNumber: true,
              total: true,
              status: true,
            },
          },
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }

      return project;
    }),

  // Create new project
  create: managerProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        clientId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        location: z.string().optional(),
        venue: z.string().optional(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
        estimatedValue: z.number().min(0).optional(),
        notes: z.string().optional(),
        tags: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validate client exists
      const client = await ctx.prisma.client.findFirst({
        where: {
          id: input.clientId,
          organizationId: ctx.organizationId,
        },
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Client not found',
        });
      }

      const project = await ctx.prisma.project.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        },
        include: {
          client: { select: { id: true, name: true } },
        },
      });

      // Update client's total projects
      await ctx.prisma.client.update({
        where: { id: input.clientId },
        data: { totalProjects: { increment: 1 } },
      });

      return project;
    }),

  // Update project
  update: managerProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional().nullable(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        location: z.string().optional().nullable(),
        venue: z.string().optional().nullable(),
        status: z.enum(['PLANNING', 'EQUIPMENT_READY', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED']).optional(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
        estimatedValue: z.number().min(0).optional().nullable(),
        actualValue: z.number().min(0).optional().nullable(),
        notes: z.string().optional().nullable(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const existing = await ctx.prisma.project.findFirst({
        where: {
          id,
          organizationId: ctx.organizationId,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }

      const project = await ctx.prisma.project.update({
        where: { id },
        data: updateData,
        include: {
          client: { select: { id: true, name: true } },
        },
      });

      return project;
    }),

  // Assign inventory to project
  assignInventory: managerProcedure
    .input(
      z.object({
        projectId: z.string(),
        itemId: z.string(),
        quantity: z.number().min(1).default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
          message: 'Insufficient available quantity',
        });
      }

      const assignment = await ctx.prisma.projectInventoryItem.upsert({
        where: {
          projectId_itemId: {
            projectId: input.projectId,
            itemId: input.itemId,
          },
        },
        update: { quantity: input.quantity },
        create: input,
      });

      return assignment;
    }),

  // Remove inventory from project
  removeInventory: managerProcedure
    .input(
      z.object({
        projectId: z.string(),
        itemId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.projectInventoryItem.delete({
        where: {
          projectId_itemId: {
            projectId: input.projectId,
            itemId: input.itemId,
          },
        },
      });

      return { success: true };
    }),

  // Get project statistics
  getStatistics: organizationProcedure.query(async ({ ctx }) => {
    const [
      totalProjects,
      projectsByStatus,
      upcomingProjects,
      recentProjects,
      totalValue,
    ] = await Promise.all([
      ctx.prisma.project.count({
        where: { organizationId: ctx.organizationId },
      }),
      ctx.prisma.project.groupBy({
        by: ['status'],
        where: { organizationId: ctx.organizationId },
        _count: true,
      }),
      ctx.prisma.project.findMany({
        where: {
          organizationId: ctx.organizationId,
          startDate: { gte: new Date() },
          status: { in: ['PLANNING', 'EQUIPMENT_READY'] },
        },
        orderBy: { startDate: 'asc' },
        take: 5,
        select: {
          id: true,
          name: true,
          startDate: true,
          endDate: true,
          status: true,
          client: { select: { name: true } },
        },
      }),
      ctx.prisma.project.findMany({
        where: { organizationId: ctx.organizationId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          client: { select: { name: true } },
        },
      }),
      ctx.prisma.project.aggregate({
        where: { organizationId: ctx.organizationId },
        _sum: {
          estimatedValue: true,
          actualValue: true,
        },
      }),
    ]);

    return {
      totalProjects,
      projectsByStatus,
      upcomingProjects,
      recentProjects,
      totalEstimatedValue: totalValue._sum.estimatedValue,
      totalActualValue: totalValue._sum.actualValue,
    };
  }),
});
