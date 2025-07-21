import { trackError, trackUserAction, useErrorTracking } from "~/lib/analytics";

import { useCallback } from "react";
import { useToast } from "~/hooks/use-toast";

// ============================================================================
// TIPOS UTILITÁRIOS
// ============================================================================

export interface ErrorInfo {
  code: string;
  message: string;
  statusCode?: number;
  context?: Record<string, unknown>;
}

export interface SuccessInfo {
  message: string;
  action?: string;
  resource?: string;
}

export interface WarningInfo {
  message: string;
  action?: string;
}

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Detecta se um erro é do tipo tRPC
 */
export function isTRPCError(
  error: unknown,
): error is { code: string; message: string } {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    "message" in error &&
    typeof (error as any).code === "string" &&
    typeof (error as any).message === "string"
  );
}

/**
 * Detecta se um erro é do tipo AppError
 */
export function isAppError(
  error: unknown,
): error is { code: string; message: string; statusCode?: number } {
  return (
    isTRPCError(error) &&
    "statusCode" in error &&
    typeof (error as any).statusCode === "number"
  );
}

/**
 * Extrai informações de erro de diferentes tipos
 */
export function extractErrorInfo(error: unknown): ErrorInfo {
  if (isTRPCError(error)) {
    return {
      code: error.code,
      message: error.message,
      statusCode: isAppError(error) ? error.statusCode : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: String(error),
  };
}

// ============================================================================
// HOOK PRINCIPAL DE TRATAMENTO DE ERROS
// ============================================================================

/**
 * Hook principal para tratamento de erros, sucessos e avisos
 * Integra com toast notifications e Vercel Analytics
 */
export function useErrorHandler() {
  const { toast } = useToast();
  const { trackError: trackErrorInComponent } = useErrorTracking();

  const handleError = useCallback(
    (error: unknown, context?: { operation?: string; userId?: string }) => {
      const errorInfo = extractErrorInfo(error);

      // Track erro para Vercel Analytics
      trackError(errorInfo.code, errorInfo.message, {
        operation: context?.operation,
        userId: context?.userId,
      });

      // Track erro no componente também
      trackErrorInComponent(error, context?.operation);

      // Determina o tipo de toast baseado no código de erro
      let variant: "default" | "destructive" = "destructive";

      if (errorInfo.code.startsWith("VAL_")) {
        variant = "default"; // Erros de validação são menos críticos
      }

      // Exibe toast de erro
      toast({
        title: "Erro",
        description: errorInfo.message,
        variant,
      });

      // Log adicional para debugging
      if (process.env.NODE_ENV === "development") {
        console.error("[ERROR_HANDLER]", {
          error: errorInfo,
          context,
          originalError: error,
        });
      }
    },
    [toast, trackErrorInComponent],
  );

  const handleSuccess = useCallback(
    (info: SuccessInfo, context?: { userId?: string }) => {
      // Track ação do usuário para Vercel Analytics
      trackUserAction(info.action || "success", true, {
        resource: info.resource,
        userId: context?.userId,
      });

      // Exibe toast de sucesso
      toast({
        title: "Sucesso",
        description: info.message,
        variant: "default",
      });
    },
    [toast],
  );

  const handleWarning = useCallback(
    (info: WarningInfo, context?: { userId?: string }) => {
      // Track ação do usuário para Vercel Analytics
      trackUserAction(info.action || "warning", true, {
        userId: context?.userId,
      });

      // Exibe toast de aviso
      toast({
        title: "Aviso",
        description: info.message,
        variant: "default",
      });
    },
    [toast],
  );

  return {
    handleError,
    handleSuccess,
    handleWarning,
  };
}

// ============================================================================
// HOOK PARA TRATAMENTO DE ERROS DE MUTAÇÃO
// ============================================================================

/**
 * Hook para tratamento automático de erros em mutações
 */
export function useMutationErrorHandler() {
  const { handleError, handleSuccess } = useErrorHandler();

  const handleMutationError = useCallback(
    (error: unknown, context?: { operation?: string; userId?: string }) => {
      handleError(error, context);
    },
    [handleError],
  );

  const handleMutationSuccess = useCallback(
    (
      message: string,
      context?: { action?: string; resource?: string; userId?: string },
    ) => {
      handleSuccess(
        {
          message,
          action: context?.action,
          resource: context?.resource,
        },
        { userId: context?.userId },
      );
    },
    [handleSuccess],
  );

  return {
    handleMutationError,
    handleMutationSuccess,
  };
}

// ============================================================================
// HOOK PARA TRATAMENTO DE ERROS DE FORMULÁRIO
// ============================================================================

/**
 * Hook para tratamento de erros de validação de formulário
 */
export function useFormErrorHandler() {
  const { toast } = useToast();

  const handleFormError = useCallback(
    (error: unknown, field?: string) => {
      const errorInfo = extractErrorInfo(error);

      // Track erro para Vercel Analytics
      trackError(errorInfo.code, errorInfo.message, {
        operation: "form_validation",
      });

      // Exibe toast de erro de formulário
      toast({
        title: field ? `Erro no campo ${field}` : "Erro de validação",
        description: errorInfo.message,
        variant: "default", // Erros de validação são menos críticos
      });

      // Log adicional para debugging
      if (process.env.NODE_ENV === "development") {
        console.error("[FORM_ERROR_HANDLER]", {
          error: errorInfo,
          field,
          originalError: error,
        });
      }
    },
    [toast],
  );

  const handleFormSuccess = useCallback(
    (message: string, action?: string) => {
      // Track ação do usuário para Vercel Analytics
      trackUserAction(action || "form_submit", true);

      // Exibe toast de sucesso
      toast({
        title: "Sucesso",
        description: message,
        variant: "default",
      });
    },
    [toast],
  );

  return {
    handleFormError,
    handleFormSuccess,
  };
}

// ============================================================================
// HOOK PARA TRATAMENTO DE ERROS DE QUERY
// ============================================================================

/**
 * Hook para tratamento de erros em queries
 */
export function useQueryErrorHandler() {
  const { handleError } = useErrorHandler();

  const handleQueryError = useCallback(
    (error: unknown, context?: { operation?: string; userId?: string }) => {
      // Para queries, podemos querer um tratamento diferente
      // Por exemplo, não mostrar toast para erros de rede em queries
      const errorInfo = extractErrorInfo(error);

      if (errorInfo.code === "UNAUTHORIZED" || errorInfo.code === "FORBIDDEN") {
        // Erros de autenticação/autorização sempre mostram toast
        handleError(error, context);
      } else {
        // Para outros erros de query, apenas track no analytics
        trackError(errorInfo.code, errorInfo.message, {
          operation: context?.operation,
          userId: context?.userId,
        });

        // Log para debugging
        if (process.env.NODE_ENV === "development") {
          console.error("[QUERY_ERROR_HANDLER]", {
            error: errorInfo,
            context,
            originalError: error,
          });
        }
      }
    },
    [handleError],
  );

  return {
    handleQueryError,
  };
}

// ============================================================================
// HOOK COMBINADO PARA USO GERAL
// ============================================================================

/**
 * Hook combinado que fornece todos os handlers de erro
 */
export function useComprehensiveErrorHandler() {
  const errorHandler = useErrorHandler();
  const mutationHandler = useMutationErrorHandler();
  const formHandler = useFormErrorHandler();
  const queryHandler = useQueryErrorHandler();

  return {
    ...errorHandler,
    ...mutationHandler,
    ...formHandler,
    ...queryHandler,
  };
}
