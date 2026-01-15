import { Prisma } from '@prisma/client';
import { logger } from './logger';
import { jsonResponse } from '@/utils/bigint-serializer';

/**
 * Handler centralizado de erros
 * Trata erros do Prisma e outros erros comuns
 */

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  code?: string;
}

/**
 * Trata erros do Prisma de forma específica
 */
export function handlePrismaError(error: unknown): ErrorResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        return {
          success: false,
          error: 'Registro duplicado',
          message: 'Já existe um registro com esses dados',
          code: error.code,
        };

      case 'P2025':
        // Record not found
        return {
          success: false,
          error: 'Registro não encontrado',
          message: 'O recurso solicitado não existe',
          code: error.code,
        };

      case 'P2003':
        // Foreign key constraint violation
        return {
          success: false,
          error: 'Referência inválida',
          message: 'O registro referenciado não existe',
          code: error.code,
        };

      case 'P2014':
        // Invalid ID
        return {
          success: false,
          error: 'ID inválido',
          message: 'O identificador fornecido é inválido',
          code: error.code,
        };

      default:
        logger.error('Erro Prisma não tratado', error, { code: error.code });
        return {
          success: false,
          error: 'Erro no banco de dados',
          message: 'Ocorreu um erro ao processar sua solicitação',
          code: error.code,
        };
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      success: false,
      error: 'Dados inválidos',
      message: 'Os dados fornecidos são inválidos',
    };
  }

  // Erro desconhecido
  logger.error('Erro desconhecido', error);
  return {
    success: false,
    error: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado',
  };
}

/**
 * Trata erros de validação (Zod)
 */
export function handleValidationError(error: unknown): ErrorResponse {
  return {
    success: false,
    error: 'Dados inválidos',
    message: error instanceof Error ? error.message : 'Os dados fornecidos são inválidos',
  };
}

/**
 * Wrapper para tratamento de erros em APIs
 */
export function handleApiError(
  error: unknown,
  context: { method: string; path: string }
): Response {
  logger.apiError(context.method, context.path, error, {
    type: error instanceof Error ? error.constructor.name : typeof error,
  });

  // Tratar erros do Prisma
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    const errorResponse = handlePrismaError(error);
    const status = error instanceof Prisma.PrismaClientKnownRequestError && 
                   error.code === 'P2025' ? 404 : 400;
    return jsonResponse(errorResponse, status);
  }

  // Tratar erros de validação
  if (error instanceof Error && error.name === 'ZodError') {
    const errorResponse = handleValidationError(error);
    return jsonResponse(errorResponse, 400);
  }

  // Erro genérico
  const errorResponse: ErrorResponse = {
    success: false,
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' && error instanceof Error
      ? error.message
      : 'Ocorreu um erro inesperado',
  };

  return jsonResponse(errorResponse, 500);
}
