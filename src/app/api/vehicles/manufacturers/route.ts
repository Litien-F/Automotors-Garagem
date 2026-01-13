import { NextRequest } from 'next/server';
import { vehicleRepository } from '@/lib/repositories/VehicleRepository';
import { jsonResponse } from '@/utils/bigint-serializer';

/**
 * API Route: GET /api/vehicles/manufacturers
 * Lista fabricantes de veículos
 */
export async function GET(request: NextRequest) {
  try {
    const manufacturers = await vehicleRepository.findAllManufacturers();

    return jsonResponse({
      success: true,
      data: manufacturers,
    });
  } catch (error) {
    console.error('Erro ao buscar fabricantes:', error);

    return jsonResponse(
      {
        success: false,
        error: 'Erro ao buscar fabricantes',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      500
    );
  }
}
