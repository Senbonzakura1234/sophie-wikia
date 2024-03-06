import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod';
import type { Context } from '~/server/trpc/context'
import { evnIs } from '~/utils';

const t = initTRPC.context<Context>().create({
	isDev: !evnIs('production'),
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten().fieldErrors : null,
			},
		};
	},
})

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
