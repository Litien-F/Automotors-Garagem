import { NextRequest } from 'next/server';
import { productRepository } from '@/lib/repositories/ProductRepository';
import { jsonResponse } from '@/utils/bigint-serializer';

/**
 * API Route: GET /api/products/[id]
 * Busca produto por ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = BigInt(params.id);
    const product = await productRepository.findById(productId);

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
    console.error('Erro ao buscar produto:', error);

    return jsonResponse(
      {
        success: false,
        error: 'Erro ao buscar produto',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      500
    );
  }
}
