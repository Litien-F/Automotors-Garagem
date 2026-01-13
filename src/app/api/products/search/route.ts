import { NextRequest } from 'next/server';
import { productRepository } from '@/lib/repositories/ProductRepository';
import { jsonResponse } from '@/utils/bigint-serializer';

/**
 * API Route: GET /api/products/search
 * Busca produtos com filtros
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filters = {
      query: searchParams.get('query') || undefined,
      categoryId: searchParams.get('categoryId') ? BigInt(searchParams.get('categoryId')!) : undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      inStock: searchParams.get('inStock') === 'true',
    };

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;

    const result = await productRepository.search(filters, page, limit);

    return jsonResponse({
      success: true,
      data: result.products,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);

    return jsonResponse(
      {
        success: false,
        error: 'Erro ao buscar produtos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      500
    );
  }
}
