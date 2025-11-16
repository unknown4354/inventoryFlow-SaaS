import { z } from 'zod';
import { router, organizationProcedure, managerProcedure, operatorProcedure } from '../trpc/trpc';
import { TRPCError } from '@trpc/server';

export const inventoryRouter = router({
  // List inventory items with pagination and filters
  list: organizationProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        search: z.string().optional(),
        categoryId: z.string().optional(),
        warehouseId: z.string().optional(),
        status: z.enum(['AVAILABLE', 'IN_USE', 'RESERVED', 'MAINTENANCE', 'DAMAGED', 'RETIRED']).optional(),
        vendorType: z.enum(['GENERAL', 'ELECTRICAL', 'STRUCTURES', 'AV_EQUIPMENT', 'DECOR', 'FURNITURE', 'CATERING']).optional(),
        sortBy: z.enum(['name', 'createdAt', 'purchasePrice', 'availableQuantity']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, categoryId, warehouseId, status, vendorType, sortBy, sortOrder } = input;
      const skip = (page - 1) * limit;

      const where = {
        organizationId: ctx.organizationId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { sku: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
        ...(categoryId && { categoryId }),
        ...(warehouseId && { warehouseId }),
        ...(status && { status }),
        ...(vendorType && { vendorType }),
      };

      const [items, total] = await Promise.all([
        ctx.prisma.inventoryItem.findMany({
          where,
          include: {
            category: true,
            warehouse: true,
            location: true,
          },
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
        }),
        ctx.prisma.inventoryItem.count({ where }),
      ]);

      return {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),

  // Get single item by ID
  getById: organizationProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.prisma.inventoryItem.findFirst({
        where: {
          id: input.id,
          organizationId: ctx.organizationId,
        },
        include: {
          category: true,
          warehouse: true,
          location: true,
          checkOuts: {
            orderBy: { checkedOutAt: 'desc' },
            take: 10,
            include: {
              checkedOutUser: { select: { id: true, name: true, email: true } },
              returnedUser: { select: { id: true, name: true, email: true } },
              project: { select: { id: true, name: true } },
            },
          },
          maintenanceLogs: {
            orderBy: { performedAt: 'desc' },
            take: 5,
          },
          auditLogs: {
            orderBy: { timestamp: 'desc' },
            take: 10,
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
      });

      if (!item) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Inventory item not found',
        });
      }

      return item;
    }),

  // Create new inventory item
  create: managerProcedure
    .input(
      z.object({
        sku: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        categoryId: z.string(),
        warehouseId: z.string(),
        locationId: z.string().optional(),
        totalQuantity: z.number().min(1).default(1),
        purchasePrice: z.number().min(0),
        rentalPriceDaily: z.number().min(0).optional(),
        rentalPriceWeekly: z.number().min(0).optional(),
        marketValue: z.number().min(0).optional(),
        insuranceValue: z.number().min(0).optional(),
        condition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED']).default('GOOD'),
        vendorType: z.enum(['GENERAL', 'ELECTRICAL', 'STRUCTURES', 'AV_EQUIPMENT', 'DECOR', 'FURNITURE', 'CATERING']).default('GENERAL'),
        purchaseDate: z.date().optional(),
        warrantyExpiry: z.date().optional(),
        barcode: z.string().optional(),
        images: z.array(z.string()).default([]),
        documents: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        notes: z.string().optional(),
        specifications: z.record(z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if SKU already exists
      const existingSku = await ctx.prisma.inventoryItem.findFirst({
        where: {
          organizationId: ctx.organizationId,
          sku: input.sku,
        },
      });

      if (existingSku) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'SKU already exists',
        });
      }

      const item = await ctx.prisma.inventoryItem.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
          availableQuantity: input.totalQuantity,
        },
        include: {
          category: true,
          warehouse: true,
          location: true,
        },
      });

      // Create audit log
      await ctx.prisma.inventoryAuditLog.create({
        data: {
          itemId: item.id,
          action: 'CREATED',
          userId: ctx.session.user.id,
          changes: input,
        },
      });

      return item;
    }),

  // Update inventory item
  update: managerProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        categoryId: z.string().optional(),
        warehouseId: z.string().optional(),
        locationId: z.string().optional().nullable(),
        totalQuantity: z.number().min(0).optional(),
        purchasePrice: z.number().min(0).optional(),
        rentalPriceDaily: z.number().min(0).optional().nullable(),
        rentalPriceWeekly: z.number().min(0).optional().nullable(),
        marketValue: z.number().min(0).optional().nullable(),
        insuranceValue: z.number().min(0).optional().nullable(),
        status: z.enum(['AVAILABLE', 'IN_USE', 'RESERVED', 'MAINTENANCE', 'DAMAGED', 'RETIRED']).optional(),
        condition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED']).optional(),
        vendorType: z.enum(['GENERAL', 'ELECTRICAL', 'STRUCTURES', 'AV_EQUIPMENT', 'DECOR', 'FURNITURE', 'CATERING']).optional(),
        warrantyExpiry: z.date().optional().nullable(),
        nextMaintenanceDate: z.date().optional().nullable(),
        barcode: z.string().optional().nullable(),
        images: z.array(z.string()).optional(),
        documents: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        notes: z.string().optional().nullable(),
        specifications: z.record(z.any()).optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const existing = await ctx.prisma.inventoryItem.findFirst({
        where: {
          id,
          organizationId: ctx.organizationId,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Inventory item not found',
        });
      }

      const item = await ctx.prisma.inventoryItem.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
          warehouse: true,
          location: true,
        },
      });

      // Create audit log
      await ctx.prisma.inventoryAuditLog.create({
        data: {
          itemId: item.id,
          action: 'UPDATED',
          userId: ctx.session.user.id,
          changes: updateData,
        },
      });

      return item;
    }),

  // Delete (soft delete by setting status to RETIRED)
  delete: managerProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.inventoryItem.findFirst({
        where: {
          id: input.id,
          organizationId: ctx.organizationId,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Inventory item not found',
        });
      }

      const item = await ctx.prisma.inventoryItem.update({
        where: { id: input.id },
        data: { status: 'RETIRED' },
      });

      // Create audit log
      await ctx.prisma.inventoryAuditLog.create({
        data: {
          itemId: item.id,
          action: 'DELETED',
          userId: ctx.session.user.id,
          changes: { status: 'RETIRED' },
        },
      });

      return { success: true };
    }),

  // Get dashboard statistics
  getStatistics: organizationProcedure.query(async ({ ctx }) => {
    const [
      totalItems,
      totalValue,
      statusCounts,
      categoryDistribution,
      lowStockItems,
      maintenanceDue,
    ] = await Promise.all([
      ctx.prisma.inventoryItem.count({
        where: { organizationId: ctx.organizationId },
      }),
      ctx.prisma.inventoryItem.aggregate({
        where: { organizationId: ctx.organizationId },
        _sum: { purchasePrice: true, marketValue: true },
      }),
      ctx.prisma.inventoryItem.groupBy({
        by: ['status'],
        where: { organizationId: ctx.organizationId },
        _count: true,
      }),
      ctx.prisma.inventoryItem.groupBy({
        by: ['categoryId'],
        where: { organizationId: ctx.organizationId },
        _count: true,
        _sum: { purchasePrice: true },
      }),
      ctx.prisma.inventoryItem.count({
        where: {
          organizationId: ctx.organizationId,
          availableQuantity: { lte: 5 },
          status: 'AVAILABLE',
        },
      }),
      ctx.prisma.inventoryItem.count({
        where: {
          organizationId: ctx.organizationId,
          nextMaintenanceDate: { lte: new Date() },
        },
      }),
    ]);

    return {
      totalItems,
      totalPurchaseValue: totalValue._sum.purchasePrice,
      totalMarketValue: totalValue._sum.marketValue,
      statusCounts,
      categoryDistribution,
      lowStockItems,
      maintenanceDue,
    };
  }),

  // Check availability for date range
  checkAvailability: organizationProcedure
    .input(
      z.object({
        itemId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        quantity: z.number().min(1).default(1),
      })
    )
    .query(async ({ ctx, input }) => {
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

      // Check overlapping checkouts
      const overlappingCheckouts = await ctx.prisma.checkOut.findMany({
        where: {
          itemId: input.itemId,
          status: { in: ['ACTIVE', 'OVERDUE'] },
          OR: [
            {
              checkedOutAt: { lte: input.endDate },
              expectedReturn: { gte: input.startDate },
            },
          ],
        },
      });

      const reservedQuantity = overlappingCheckouts.reduce((sum, co) => sum + co.quantity, 0);
      const availableQuantity = item.availableQuantity - reservedQuantity;

      return {
        available: availableQuantity >= input.quantity,
        availableQuantity,
        requestedQuantity: input.quantity,
        item,
      };
    }),
});
