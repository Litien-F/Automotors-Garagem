import { NextRequest } from 'next/server';
import { vehicleRepository } from '@/lib/repositories/VehicleRepository';
import { jsonResponse } from '@/utils/bigint-serializer';

/**
 * API Route: GET /api/vehicles/[manufacturerId]
 * Lista veículos por fabricante
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { manufacturerId: string } }
) {
  try {
    const manufacturerId = BigInt(params.manufacturerId);
    const vehicles = await vehicleRepository.findByManufacturer(manufacturerId);

    return jsonResponse({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);

    return jsonResponse(
      {
        success: false,
        error: 'Erro ao buscar veículos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      500
    );
  }
}
