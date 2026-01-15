import { NextRequest } from 'next/server';
import { productRepository } from '@/lib/repositories/ProductRepository';
import { jsonResponse } from '@/utils/bigint-serializer';
import { productIdSchema } from '@/lib/validations/api-schemas';
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { handleApiError } from '@/lib/error-handler';

// Força rota dinâmica (necessário para rate limiting)
export const dynamic = 'force-dynamic';

/**
 * API Route: GET /api/products/[id]
 * Busca produto por ID
 * 
 * Params:
 * - id: ID do produto (BigInt)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Rate limiting
    const rateLimit = await rateLimiter.check(request, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      logger.warn('Rate limit excedido', {
        path: `/api/products/${params.id}`,
        remaining: rateLimit.remaining,
      });
      return jsonResponse(
        {
          success: false,
          error: 'Muitas requisições',
          message: 'Por favor, aguarde antes de tentar novamente',
        },
        429
      );
    }

    // Validação de entrada
    const validatedParams = productIdSchema.parse({ id: params.id });

    logger.apiRequest('GET', `/api/products/${params.id}`);

    // Buscar produto
    const product = await productRepository.findById(validatedParams.id);

    if (!product) {
      return jsonResponse(
        {
          success: false,
          error: 'Produto não encontrado',
        },
        404
      );
    }

    return jsonResponse({
      success: true,
      data: product,
    });
  } catch (error) {
    return handleApiError(error, {
      method: 'GET',
      path: `/api/products/${params.id}`,
    });
  }
}
