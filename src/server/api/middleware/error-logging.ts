import { TRPCError, initTRPC } from "@trpc/server";
import { trackError, trackPerformance } from "~/lib/analytics";

import { createTRPCContext } from "../trpc";
import { handleUnknownError } from "~/lib/errors";

const t = initTRPC.context<typeof createTRPCContext>().create();

/**
 * Middleware para logging de erros em procedures tRPC
 * Captura e loga erros de forma estruturada para monitoramento
 */
export const errorLoggingMiddleware = t.middleware(
  async ({ path, next, ctx }) => {
    const startTime = Date.now();

    try {
      const result = await next();
      const duration = Date.now() - startTime;

      // Track performance de sucesso
      trackPerformance(path, duration, "tRPC", ctx.session?.user?.id);

      // Log de sucesso (opcional, para debugging)
      if (process.env.NODE_ENV === "development") {
        console.log(`[TRPC] ✅ ${path} completed in ${duration}ms`);
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Se já é um TRPCError, loga diretamente
      if (error instanceof TRPCError) {
        console.error(`[TRPC] ❌ ${path} failed after ${duration}ms`, {
          code: error.code,
          message: error.message,
          path,
          duration,
          userId: ctx.session?.user?.id,
          timestamp: new Date().toISOString(),
        });

        // Track erro para Vercel Analytics
        trackError(error.code, error.message, {
          path,
          userId: ctx.session?.user?.id,
          operation: path,
          duration,
        });

        throw error;
      }

      // Para outros tipos de erro, converte para AppError
      const appError = handleUnknownError(error);

      console.error(`[TRPC] ❌ ${path} failed after ${duration}ms`, {
        code: appError.code,
        message: appError.message,
        path,
        duration,
        userId: ctx.session?.user?.id,
        timestamp: appError.timestamp.toISOString(),
        context: {
          ...appError.context,
          originalError: error instanceof Error ? error.message : String(error),
        },
      });

      // Track erro para Vercel Analytics
      trackError(appError.code, appError.message, {
        path,
        userId: ctx.session?.user?.id,
        operation: path,
        duration,
      });

      throw appError.toTRPCError();
    }
  },
);

/**
 * Middleware para validação de entrada com logging
 */
export const validationLoggingMiddleware = t.middleware(
  async ({ path, input, next, ctx }) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[TRPC] 📝 ${path} called with input:`, {
        path,
        input: JSON.stringify(input, null, 2),
        userId: ctx.session?.user?.id,
        timestamp: new Date().toISOString(),
      });
    }

    return next();
  },
);

/**
 * Middleware combinado que inclui validação e logging de erros
 */
export const comprehensiveLoggingMiddleware = t.middleware(
  async ({ path, input, next, ctx }) => {
    const startTime = Date.now();

    // Log de entrada (desenvolvimento)
    if (process.env.NODE_ENV === "development") {
      console.log(`[TRPC] 📝 ${path} called with input:`, {
        path,
        input: JSON.stringify(input, null, 2),
        userId: ctx.session?.user?.id,
        timestamp: new Date().toISOString(),
      });
    }

    try {
      const result = await next();
      const duration = Date.now() - startTime;

      // Track performance de sucesso
      trackPerformance(path, duration, "tRPC", ctx.session?.user?.id);

      // Log de sucesso (desenvolvimento)
      if (process.env.NODE_ENV === "development") {
        console.log(`[TRPC] ✅ ${path} completed in ${duration}ms`);
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Se já é um TRPCError, loga diretamente
      if (error instanceof TRPCError) {
        console.error(`[TRPC] ❌ ${path} failed after ${duration}ms`, {
          code: error.code,
          message: error.message,
          path,
          duration,
          userId: ctx.session?.user?.id,
          timestamp: new Date().toISOString(),
        });

        // Track erro para Vercel Analytics
        trackError(error.code, error.message, {
          path,
          userId: ctx.session?.user?.id,
          operation: path,
          duration,
        });

        throw error;
      }

      // Para outros tipos de erro, converte para AppError
      const appError = handleUnknownError(error);

      console.error(`[TRPC] ❌ ${path} failed after ${duration}ms`, {
        code: appError.code,
        message: appError.message,
        path,
        duration,
        userId: ctx.session?.user?.id,
        timestamp: appError.timestamp.toISOString(),
        context: {
          ...appError.context,
          originalError: error instanceof Error ? error.message : String(error),
        },
      });

      // Track erro para Vercel Analytics
      trackError(appError.code, appError.message, {
        path,
        userId: ctx.session?.user?.id,
        operation: path,
        duration,
      });

      throw appError.toTRPCError();
    }
  },
);
