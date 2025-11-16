import { z } from 'zod';
import { router, organizationProcedure, managerProcedure } from '../trpc/trpc';
import { TRPCError } from '@trpc/server';

export const clientRouter = router({
  // List all clients with pagination
  list: organizationProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        search: z.string().optional(),
        type: z.enum(['INDIVIDUAL', 'CORPORATE', 'AGENCY', 'GOVERNMENT']).optional(),
        sortBy: z.enum(['name', 'createdAt', 'totalRevenue', 'totalProjects']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, type, sortBy, sortOrder } = input;
      const skip = (page - 1) * limit;

      const where = {
        organizationId: ctx.organizationId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { contactPerson: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
        ...(type && { type }),
      };

      const [clients, total] = await Promise.all([
        ctx.prisma.client.findMany({
          where,
          include: {
            _count: {
              select: { projects: true, invoices: true },
            },
          },
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
        }),
        ctx.prisma.client.count({ where }),
      ]);

      return {
        clients,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),

  // Get single client by ID
  getById: organizationProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = await ctx.prisma.client.findFirst({
        where: {
          id: input.id,
          organizationId: ctx.organizationId,
        },
        include: {
          projects: {
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: {
              id: true,
              name: true,
              status: true,
              startDate: true,
              endDate: true,
              estimatedValue: true,
              actualValue: true,
            },
          },
          invoices: {
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: {
              id: true,
              invoiceNumber: true,
              total: true,
              status: true,
              createdAt: true,
            },
          },
        },
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Client not found',
        });
      }

      return client;
    }),

  // Create new client
  create: managerProcedure
    .input(
      z.object({
        name: z.string().min(1),
        contactPerson: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pinCode: z.string().optional(),
        type: z.enum(['INDIVIDUAL', 'CORPORATE', 'AGENCY', 'GOVERNMENT']).default('INDIVIDUAL'),
        gstNumber: z.string().optional(),
        panNumber: z.string().optional(),
        notes: z.string().optional(),
        tags: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const client = await ctx.prisma.client.create({
        data: {
          ...input,
          organizationId: ctx.organizationId,
        },
      });

      return client;
    }),

  // Update client
  update: managerProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        contactPerson: z.string().optional().nullable(),
        email: z.string().email().optional().nullable(),
        phone: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        state: z.string().optional().nullable(),
        pinCode: z.string().optional().nullable(),
        type: z.enum(['INDIVIDUAL', 'CORPORATE', 'AGENCY', 'GOVERNMENT']).optional(),
        gstNumber: z.string().optional().nullable(),
        panNumber: z.string().optional().nullable(),
        rating: z.number().min(0).max(5).optional().nullable(),
        notes: z.string().optional().nullable(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const existing = await ctx.prisma.client.findFirst({
        where: {
          id,
          organizationId: ctx.organizationId,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Client not found',
        });
      }

      const client = await ctx.prisma.client.update({
        where: { id },
        data: updateData,
      });

      return client;
    }),

  // Delete client (only if no projects)
  delete: managerProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const client = await ctx.prisma.client.findFirst({
        where: {
          id: input.id,
          organizationId: ctx.organizationId,
        },
        include: {
          _count: { select: { projects: true } },
        },
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Client not found',
        });
      }

      if (client._count.projects > 0) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Cannot delete client with existing projects',
        });
      }

      await ctx.prisma.client.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  // Get client statistics
  getStatistics: organizationProcedure.query(async ({ ctx }) => {
    const [
      totalClients,
      clientsByType,
      topClients,
      recentClients,
    ] = await Promise.all([
      ctx.prisma.client.count({
        where: { organizationId: ctx.organizationId },
      }),
      ctx.prisma.client.groupBy({
        by: ['type'],
        where: { organizationId: ctx.organizationId },
        _count: true,
      }),
      ctx.prisma.client.findMany({
        where: { organizationId: ctx.organizationId },
        orderBy: { totalRevenue: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          totalRevenue: true,
          totalProjects: true,
          rating: true,
        },
      }),
      ctx.prisma.client.findMany({
        where: { organizationId: ctx.organizationId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          type: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalClients,
      clientsByType,
      topClients,
      recentClients,
    };
  }),
});
