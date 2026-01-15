import { NextRequest } from 'next/server';
import { vehicleRepository } from '@/lib/repositories/VehicleRepository';
import { jsonResponse } from '@/utils/bigint-serializer';
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { handleApiError } from '@/lib/error-handler';

// Força rota dinâmica (necessário para rate limiting)
export const dynamic = 'force-dynamic';

/**
 * API Route: GET /api/vehicles/manufacturers
 * Lista todos os fabricantes de veículos
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = await rateLimiter.check(request, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      logger.warn('Rate limit excedido', {
        path: '/api/vehicles/manufacturers',
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

    logger.apiRequest('GET', '/api/vehicles/manufacturers');

    // Buscar fabricantes
    const manufacturers = await vehicleRepository.findAllManufacturers();

    return jsonResponse({
      success: true,
      data: manufacturers,
    });
  } catch (error) {
    return handleApiError(error, {
      method: 'GET',
      path: '/api/vehicles/manufacturers',
    });
  }
}
