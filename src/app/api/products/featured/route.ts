import { NextRequest } from 'next/server';
import { productRepository } from '@/lib/repositories/ProductRepository';
import { jsonResponse } from '@/utils/bigint-serializer';

/**
 * API Route: GET /api/products/featured
 * Busca produtos em destaque
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 8;

    const products = await productRepository.findFeatured(limit);

    return jsonResponse({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);

    return jsonResponse(
      {
        success: false,
        error: 'Erro ao buscar produtos em destaque',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      500
    );
  }
}
