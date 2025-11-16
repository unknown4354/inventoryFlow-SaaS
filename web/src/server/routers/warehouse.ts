import { z } from 'zod';
import { router, organizationProcedure, managerProcedure, adminProcedure } from '../trpc/trpc';
import { TRPCError } from '@trpc/server';

export const warehouseRouter = router({
  // List all warehouses
  list: organizationProcedure.query(async ({ ctx }) => {
    const warehouses = await ctx.prisma.warehouse.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        _count: {
          select: {
            inventoryItems: true,
            locations: true,
            staff: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return warehouses;
  }),

  // Get single warehouse by ID
  getById: organizationProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const warehouse = await ctx.prisma.warehouse.findFirst({
        where: {
          id: input.id,
          organizationId: ctx.organizationId,
        },
        include: {
          locations: true,
          staff: {
            include: {
              user: { select: { id: true, name: true, email: true, role: true } },
            },
          },
          _count: {
            select: { inventoryItems: true },
          },
        },
      });

      if (!warehouse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      return warehouse;
    }),

  // Create new warehouse
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        location: z.string().min(1),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pinCode: z.string().optional(),
        capacity: z.number().min(1),
        temperature: z.string().optional(),
        humidity: z.string().optional(),
        securityLevel: z.enum(['MAXIMUM', 'HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
        manager: z.string().optional(),
        contactPhone: z.string().optional(),
        contactEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const warehouse = await ctx.prisma.warehouse.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        },
      });

      return warehouse;
    }),

  // Update warehouse
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        location: z.string().optional(),
        address: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        state: z.string().optional().nullable(),
        pinCode: z.string().optional().nullable(),
        capacity: z.number().min(1).optional(),
        temperature: z.string().optional().nullable(),
        humidity: z.string().optional().nullable(),
        status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED']).optional(),
        securityLevel: z.enum(['MAXIMUM', 'HIGH', 'MEDIUM', 'LOW']).optional(),
        manager: z.string().optional().nullable(),
        contactPhone: z.string().optional().nullable(),
        contactEmail: z.string().email().optional().nullable(),
        floorPlanUrl: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const existing = await ctx.prisma.warehouse.findFirst({
        where: {
          id,
          organizationId: ctx.organizationId,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      const warehouse = await ctx.prisma.warehouse.update({
        where: { id },
        data: updateData,
      });

      return warehouse;
    }),

  // Add location to warehouse
  addLocation: managerProcedure
    .input(
      z.object({
        warehouseId: z.string(),
        name: z.string().min(1),
        zone: z.string().optional(),
        capacity: z.number().optional(),
        positionX: z.number().optional(),
        positionY: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const warehouse = await ctx.prisma.warehouse.findFirst({
        where: {
          id: input.warehouseId,
          organizationId: ctx.organizationId,
        },
      });

      if (!warehouse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      const location = await ctx.prisma.warehouseLocation.create({
        data: input,
      });

      return location;
    }),

  // Assign staff to warehouse
  assignStaff: adminProcedure
    .input(
      z.object({
        warehouseId: z.string(),
        userId: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const warehouse = await ctx.prisma.warehouse.findFirst({
        where: {
          id: input.warehouseId,
          organizationId: ctx.organizationId,
        },
      });

      if (!warehouse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      const staff = await ctx.prisma.warehouseStaff.upsert({
        where: {
          warehouseId_userId: {
            warehouseId: input.warehouseId,
            userId: input.userId,
          },
        },
        update: { role: input.role },
        create: input,
      });

      return staff;
    }),

  // Remove staff from warehouse
  removeStaff: adminProcedure
    .input(
      z.object({
        warehouseId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.warehouseStaff.delete({
        where: {
          warehouseId_userId: {
            warehouseId: input.warehouseId,
            userId: input.userId,
          },
        },
      });

      return { success: true };
    }),

  // Get warehouse statistics
  getStatistics: organizationProcedure.query(async ({ ctx }) => {
    const warehouses = await ctx.prisma.warehouse.findMany({
      where: { organizationId: ctx.organizationId },
      include: {
        _count: {
          select: { inventoryItems: true },
        },
      },
    });

    const stats = warehouses.map((w) => ({
      id: w.id,
      name: w.name,
      capacity: w.capacity,
      currentOccupancy: w.currentOccupancy,
      utilizationRate: (w.currentOccupancy / w.capacity) * 100,
      itemCount: w._count.inventoryItems,
      status: w.status,
    }));

    return stats;
  }),
});
