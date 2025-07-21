import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { trackError } from "./analytics";

// ============================================================================
// CÓDIGOS DE ERRO ESTRUTURADOS
// ============================================================================

export const ERROR_CODES = {
  // Erros de Autenticação e Autorização
  AUTH: {
    UNAUTHORIZED: "AUTH_001",
    INSUFFICIENT_PERMISSIONS: "AUTH_002",
    SESSION_EXPIRED: "AUTH_003",
    INVALID_CREDENTIALS: "AUTH_004",
  },

  // Erros de Validação
  VALIDATION: {
    INVALID_INPUT: "VAL_001",
    MISSING_REQUIRED_FIELD: "VAL_002",
    INVALID_FORMAT: "VAL_003",
    CONSTRAINT_VIOLATION: "VAL_004",
  },

  // Erros de Recurso
  RESOURCE: {
    NOT_FOUND: "RES_001",
    ALREADY_EXISTS: "RES_002",
    CONFLICT: "RES_003",
    DELETED: "RES_004",
  },

  // Erros de Banco de Dados
  DATABASE: {
    CONNECTION_ERROR: "DB_001",
    QUERY_ERROR: "DB_002",
    TRANSACTION_ERROR: "DB_003",
    CONSTRAINT_VIOLATION: "DB_004",
    DEADLOCK: "DB_005",
  },

  // Erros de Negócio
  BUSINESS: {
    INVALID_OPERATION: "BUS_001",
    WORKFLOW_VIOLATION: "BUS_002",
    STATE_CONFLICT: "BUS_003",
    BUSINESS_RULE_VIOLATION: "BUS_004",
  },

  // Erros de Sistema
  SYSTEM: {
    INTERNAL_ERROR: "SYS_001",
    EXTERNAL_SERVICE_ERROR: "SYS_002",
    TIMEOUT: "SYS_003",
    RATE_LIMIT_EXCEEDED: "SYS_004",
  },
} as const;

// ============================================================================
// CLASSES DE ERRO CUSTOMIZADAS
// ============================================================================

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, unknown>;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;
    this.timestamp = new Date();

    // Mantém o stack trace para debugging
    Error.captureStackTrace(this, this.constructor);

    // Track erro para Vercel Analytics
    trackError(this.code, this.message, {
      operation: context?.operation as string,
      userId: context?.userId as string,
    });
  }

  toTRPCError(): TRPCError {
    return new TRPCError({
      code: this.getTRPCCode(),
      message: this.message,
      cause: this,
    });
  }

  private getTRPCCode(): TRPCError["code"] {
    switch (this.statusCode) {
      case 400:
        return "BAD_REQUEST";
      case 401:
        return "UNAUTHORIZED";
      case 403:
        return "FORBIDDEN";
      case 404:
        return "NOT_FOUND";
      case 409:
        return "CONFLICT";
      case 422:
        return "UNPROCESSABLE_CONTENT";
      case 429:
        return "TOO_MANY_REQUESTS";
      case 500:
        return "INTERNAL_SERVER_ERROR";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, ERROR_CODES.VALIDATION.INVALID_INPUT, 400, true, context);
  }
}

export class ResourceNotFoundError extends AppError {
  constructor(
    resource: string,
    identifier?: string,
    context?: Record<string, unknown>,
  ) {
    const message = identifier
      ? `${resource} com identificador '${identifier}' não encontrado`
      : `${resource} não encontrado`;

    super(message, ERROR_CODES.RESOURCE.NOT_FOUND, 404, true, context);
  }
}

export class ResourceConflictError extends AppError {
  constructor(
    resource: string,
    reason: string,
    context?: Record<string, unknown>,
  ) {
    super(
      `Conflito em ${resource}: ${reason}`,
      ERROR_CODES.RESOURCE.CONFLICT,
      409,
      true,
      context,
    );
  }
}

export class DatabaseError extends AppError {
  constructor(
    message: string,
    originalError?: Error,
    context?: Record<string, unknown>,
  ) {
    super(message, ERROR_CODES.DATABASE.QUERY_ERROR, 500, false, {
      ...context,
      originalError: originalError?.message,
    });
  }
}

export class BusinessLogicError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, ERROR_CODES.BUSINESS.INVALID_OPERATION, 422, true, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string = "Autenticação necessária",
    context?: Record<string, unknown>,
  ) {
    super(message, ERROR_CODES.AUTH.UNAUTHORIZED, 401, true, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string = "Permissões insuficientes",
    context?: Record<string, unknown>,
  ) {
    super(
      message,
      ERROR_CODES.AUTH.INSUFFICIENT_PERMISSIONS,
      403,
      true,
      context,
    );
  }
}

// ============================================================================
// UTILITÁRIOS DE ERRO
// ============================================================================

export function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError,
): AppError {
  const context = {
    code: error.code,
    meta: error.meta,
    target: error.meta?.target,
  };

  switch (error.code) {
    case "P2002":
      const target = error.meta?.target as string[];
      const field = target?.[0] || "campo";
      return new ResourceConflictError(
        "Recurso",
        `${field} já existe no sistema`,
        context,
      );

    case "P2025":
      return new ResourceNotFoundError("Registro", undefined, context);

    case "P2003":
      return new ValidationError("Violação de chave estrangeira", context);

    case "P2014":
      return new ValidationError("Identificador inválido", context);

    case "P2021":
      return new DatabaseError(
        "Tabela não encontrada no banco de dados",
        error,
        context,
      );

    case "P2022":
      return new DatabaseError(
        "Coluna não encontrada no banco de dados",
        error,
        context,
      );

    default:
      return new DatabaseError(
        `Erro de banco de dados: ${error.message}`,
        error,
        context,
      );
  }
}

export function handleUnknownError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new DatabaseError("Erro desconhecido do banco de dados", error);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError("Erro de validação do banco de dados", {
      originalError: error.message,
    });
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      ERROR_CODES.SYSTEM.INTERNAL_ERROR,
      500,
      false,
      { originalError: error.message, stack: error.stack },
    );
  }

  return new AppError(
    "Erro interno desconhecido",
    ERROR_CODES.SYSTEM.INTERNAL_ERROR,
    500,
    false,
    { originalError: String(error) },
  );
}

// ============================================================================
// FUNÇÃO DE WRAPPER PARA PROCEDURES
// ============================================================================

export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: Record<string, unknown>,
): T {
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = handleUnknownError(error);

      // Log do erro para monitoramento
      console.error(`[ERROR] ${appError.code}: ${appError.message}`, {
        timestamp: appError.timestamp,
        context: { ...appError.context, ...context },
        stack: appError.stack,
      });

      throw appError.toTRPCError();
    }
  }) as T;
}

// ============================================================================
// FUNÇÕES DE CONVENIÊNCIA PARA ERROS COMUNS
// ============================================================================

export function createNotFoundError(resource: string, identifier?: string) {
  return new ResourceNotFoundError(resource, identifier);
}

export function createConflictError(resource: string, reason: string) {
  return new ResourceConflictError(resource, reason);
}

export function createValidationError(message: string, field?: string) {
  return new ValidationError(message, field ? { field } : undefined);
}

export function createBusinessError(message: string, operation?: string) {
  return new BusinessLogicError(message, operation ? { operation } : undefined);
}

// ============================================================================
// TIPOS UTILITÁRIOS
// ============================================================================

export type ErrorCode =
  (typeof ERROR_CODES)[keyof typeof ERROR_CODES][keyof (typeof ERROR_CODES)[keyof typeof ERROR_CODES]];

export interface ErrorContext {
  userId?: string;
  resourceId?: string;
  operation?: string;
  timestamp?: Date;
  [key: string]: unknown;
}

export interface ErrorResponse {
  code: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  context?: Record<string, unknown>;
}
