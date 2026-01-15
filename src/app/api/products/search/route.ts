import { NextRequest } from 'next/server';
import { productRepository } from '@/lib/repositories/ProductRepository';
import { jsonResponse } from '@/utils/bigint-serializer';
import { searchProductsSchema } from '@/lib/validations/api-schemas';
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { handleApiError } from '@/lib/error-handler';

// Força rota dinâmica (necessário para rate limiting)
export const dynamic = 'force-dynamic';

/**
 * API Route: GET /api/products/search
 * Busca produtos com filtros avançados
 * 
 * Query params:
 * - query: termo de busca
 * - categoryId, manufacturerId, vehicleId, variantId: filtros
 * - minPrice, maxPrice: faixa de preço
 * - inStock, isRare: filtros booleanos
 * - page, limit: paginação
 * - sortBy, sortOrder: ordenação
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = await rateLimiter.check(request, RATE_LIMITS.SEARCH);
    if (!rateLimit.success) {
      logger.warn('Rate limit excedido', {
        path: '/api/products/search',
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
    const params = Object.fromEntries(searchParams.entries());
    const validatedParams = searchProductsSchema.parse(params);

    logger.apiRequest('GET', '/api/products/search', {
      query: validatedParams.query,
      filters: {
        categoryId: validatedParams.categoryId?.toString(),
        inStock: validatedParams.inStock,
      },
    });

    // Buscar produtos
    const result = await productRepository.searchProducts(validatedParams);

    return jsonResponse({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return handleApiError(error, {
      method: 'GET',
      path: '/api/products/search',
    });
  }
}
