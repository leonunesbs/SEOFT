import { track } from "@vercel/analytics";

// ============================================================================
// UTILITÁRIOS DE ANALYTICS
// ============================================================================

/**
 * Remove propriedades undefined de um objeto
 */
function cleanProperties<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  const cleaned: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
}

/**
 * Determina a severidade do erro baseado no código
 */
function getErrorSeverity(
  code: string,
): "low" | "medium" | "high" | "critical" {
  if (code.startsWith("AUTH_")) {
    return "medium"; // Erros de autenticação são médios
  }

  if (code.startsWith("VAL_")) {
    return "low"; // Erros de validação são baixos
  }

  if (code.startsWith("RES_")) {
    return "medium"; // Erros de recurso são médios
  }

  if (code.startsWith("DB_")) {
    return "high"; // Erros de banco são altos
  }

  if (code.startsWith("BUS_")) {
    return "medium"; // Erros de negócio são médios
  }

  if (code.startsWith("SYS_")) {
    return "critical"; // Erros de sistema são críticos
  }

  return "medium"; // Padrão
}

/**
 * Envia evento de erro para o Vercel Analytics
 */
export function trackError(
  code: string,
  message: string,
  metadata?: {
    path?: string;
    userId?: string;
    operation?: string;
    duration?: number;
  },
): void {
  try {
    const properties = cleanProperties({
      code,
      message,
      path: metadata?.path,
      userId: metadata?.userId,
      operation: metadata?.operation,
      severity: getErrorSeverity(code),
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      duration: metadata?.duration,
    });

    // Envia para Vercel Analytics
    track("error", properties);

    // Log local para debugging
    if (process.env.NODE_ENV === "development") {
      console.log("[ANALYTICS] Error tracked:", { name: "error", properties });
    }
  } catch (analyticsError) {
    // Se falhar ao enviar analytics, apenas loga localmente
    console.error("[ANALYTICS] Failed to track error:", analyticsError);
  }
}

/**
 * Envia evento de performance para o Vercel Analytics
 */
export function trackPerformance(
  path: string,
  duration: number,
  operation: string,
  userId?: string,
): void {
  try {
    const properties = cleanProperties({
      path,
      duration,
      operation,
      userId,
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    });

    // Envia para Vercel Analytics
    track("performance", properties);

    // Log local para debugging
    if (process.env.NODE_ENV === "development") {
      console.log("[ANALYTICS] Performance tracked:", {
        name: "performance",
        properties,
      });
    }
  } catch (analyticsError) {
    console.error("[ANALYTICS] Failed to track performance:", analyticsError);
  }
}

/**
 * Envia evento de ação do usuário para o Vercel Analytics
 */
export function trackUserAction(
  action: string,
  success: boolean,
  metadata?: {
    resource?: string;
    userId?: string;
  },
): void {
  try {
    const properties = cleanProperties({
      action,
      resource: metadata?.resource,
      userId: metadata?.userId,
      success,
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    });

    // Envia para Vercel Analytics
    track("user_action", properties);

    // Log local para debugging
    if (process.env.NODE_ENV === "development") {
      console.log("[ANALYTICS] User action tracked:", {
        name: "user_action",
        properties,
      });
    }
  } catch (analyticsError) {
    console.error("[ANALYTICS] Failed to track user action:", analyticsError);
  }
}

// ============================================================================
// FUNÇÕES DE CONVENIÊNCIA
// ============================================================================

/**
 * Track de erro com contexto simplificado
 */
export function trackErrorSimple(
  code: string,
  message: string,
  path?: string,
  userId?: string,
): void {
  trackError(code, message, { path, userId });
}

/**
 * Track de performance simplificado
 */
export function trackPerformanceSimple(
  path: string,
  duration: number,
  userId?: string,
): void {
  trackPerformance(path, duration, "unknown", userId);
}

/**
 * Track de ação do usuário simplificado
 */
export function trackUserActionSimple(
  action: string,
  success: boolean,
  userId?: string,
): void {
  trackUserAction(action, success, { userId });
}

// ============================================================================
// WRAPPERS PARA INTEGRAÇÃO COM SISTEMA DE ERROS
// ============================================================================

/**
 * Wrapper para tracking automático de erros do sistema
 */
export function withErrorTracking<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: {
    operation?: string;
    path?: string;
    userId?: string;
  },
): T {
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const startTime = Date.now();

    try {
      const result = await fn(...args);
      const duration = Date.now() - startTime;

      // Track performance de sucesso
      if (context?.path) {
        trackPerformance(
          context.path,
          duration,
          context.operation || "unknown",
          context.userId,
        );
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Track erro
      if (error && typeof error === "object" && "code" in error) {
        trackError((error as any).code, (error as any).message, {
          path: context?.path,
          userId: context?.userId,
          operation: context?.operation,
          duration,
        });
      } else {
        // Erro genérico
        trackError(
          "UNKNOWN",
          error instanceof Error ? error.message : String(error),
          {
            path: context?.path,
            userId: context?.userId,
            operation: context?.operation,
            duration,
          },
        );
      }

      throw error;
    }
  }) as T;
}

// ============================================================================
// HOOKS PARA REACT
// ============================================================================

/**
 * Hook para tracking de erros em componentes React
 */
export function useErrorTracking() {
  const trackErrorInComponent = (error: unknown, context?: string) => {
    if (error instanceof Error) {
      trackError("REACT_ERROR", error.message, { operation: context });
    } else {
      trackError("REACT_ERROR", String(error), { operation: context });
    }
  };

  const trackUserActionInComponent = (
    action: string,
    success: boolean,
    resource?: string,
  ) => {
    trackUserAction(action, success, { resource });
  };

  return {
    trackError: trackErrorInComponent,
    trackUserAction: trackUserActionInComponent,
  };
}
