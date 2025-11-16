import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

// Middleware to check if user belongs to an organization
const hasOrganization = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user?.organizationId) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User must belong to an organization',
    });
  }
  return next({
    ctx: {
      ...ctx,
      organizationId: ctx.session.user.organizationId,
    },
  });
});

// Middleware for role-based access control
const hasRole = (allowedRoles: string[]) =>
  t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user?.role) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    if (!allowedRoles.includes(ctx.session.user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions',
      });
    }
    return next({ ctx });
  });

export const protectedProcedure = t.procedure.use(isAuthed);
export const organizationProcedure = t.procedure.use(isAuthed).use(hasOrganization);

// Role-specific procedures
export const adminProcedure = t.procedure
  .use(isAuthed)
  .use(hasOrganization)
  .use(hasRole(['SUPER_ADMIN', 'ADMIN']));

export const managerProcedure = t.procedure
  .use(isAuthed)
  .use(hasOrganization)
  .use(hasRole(['SUPER_ADMIN', 'ADMIN', 'MANAGER']));

export const operatorProcedure = t.procedure
  .use(isAuthed)
  .use(hasOrganization)
  .use(hasRole(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'OPERATOR']));
