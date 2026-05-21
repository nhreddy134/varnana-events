import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { initializeDatabase } from '../db/connection';
import { verifyToken } from '../middleware/auth';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  const db = await initializeDatabase();
  // Fix: Use req.headers['authorization'] for Express request headers
  const authHeader = req.headers.authorization;
  const token = typeof authHeader === 'string' ? authHeader.replace('Bearer ', '') : undefined;
  
  let user: { id: number; email: string; role: string } | null = null;
  
  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      // Token invalid, user remains null
    }
  }

  return {
    db,
    req,
    res,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next();
});
