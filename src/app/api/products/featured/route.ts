import { NextRequest } from 'next/server';
import { productRepository } from '@/lib/repositories/ProductRepository';
import { jsonResponse } from '@/utils/bigint-serializer';
import { featuredProductsSchema } from '@/lib/validations/api-schemas';
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { handleApiError } from '@/lib/error-handler';

/**
 * API Route: GET /api/products/featured
 * Busca produtos em destaque
 * 
 * Query params:
 * - limit: número de produtos (max 50, default 8)
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = await rateLimiter.check(request, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      logger.warn('Rate limit excedido', {
        path: '/api/products/featured',
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
    const searchParams = request.nextUrl.searchParams;
    const validatedParams = featuredProductsSchema.parse({
      limit: searchParams.get('limit'),
    });

    logger.apiRequest('GET', '/api/products/featured', { limit: validatedParams.limit });

    // Buscar produtos
    const products = await productRepository.findFeatured(validatedParams.limit);

    return jsonResponse({
      success: true,
      data: products,
    });
  } catch (error) {
    return handleApiError(error, {
      method: 'GET',
      path: '/api/products/featured',
    });
  }
}
