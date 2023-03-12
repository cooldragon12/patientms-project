import {initTRPC} from '@trpc/server';

const rpc = initTRPC.create();

export const router = rpc.router;
export const middleware = rpc.middleware;
export const publicProcedure = rpc.procedure;