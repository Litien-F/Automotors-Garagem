import { NextRequest } from 'next/server';
import { vehicleRepository } from '@/lib/repositories/VehicleRepository';
import { jsonResponse } from '@/utils/bigint-serializer';
import { manufacturerIdSchema } from '@/lib/validations/api-schemas';
import { rateLimiter, RATE_LIMITS } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { handleApiError } from '@/lib/error-handler';

// Força rota dinâmica (necessário para rate limiting)
export const dynamic = 'force-dynamic';

/**
 * API Route: GET /api/vehicles/[manufacturerId]
 * Lista veículos por fabricante
 * 
 * Params:
 * - manufacturerId: ID do fabricante (BigInt)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { manufacturerId: string } }
) {
  try {
    // Rate limiting
    const rateLimit = await rateLimiter.check(request, RATE_LIMITS.PUBLIC);
    if (!rateLimit.success) {
      logger.warn('Rate limit excedido', {
        path: `/api/vehicles/${params.manufacturerId}`,
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
    const validatedParams = manufacturerIdSchema.parse({
      manufacturerId: params.manufacturerId,
    });

    logger.apiRequest('GET', `/api/vehicles/${params.manufacturerId}`);

    // Buscar veículos
    const vehicles = await vehicleRepository.findByManufacturer(validatedParams.manufacturerId);

    return jsonResponse({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    return handleApiError(error, {
      method: 'GET',
      path: `/api/vehicles/${params.manufacturerId}`,
    });
  }
}
