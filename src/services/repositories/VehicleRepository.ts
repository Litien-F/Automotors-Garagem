import { prisma } from '@/lib/prisma'
import { VehicleType } from '@prisma/client'

/**
 * VehicleRepository - Repositório para operações relacionadas a veículos
 * 
 * Responsabilidades:
 * - Buscar montadoras, veículos e variantes
 * - Fornecer dados para filtros em cascata
 * - Gerenciar hierarquia de veículos
 */
export class VehicleRepository {
  /**
   * Busca todas as montadoras ativas
   */
  async findAllManufacturers() {
    return prisma.manufacturer.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        logoUrl: true,
      },
    })
  }

  /**
   * Busca veículos por montadora
   */
  async findVehiclesByManufacturer(
    manufacturerId: string,
    type?: VehicleType
  ) {
    return prisma.vehicle.findMany({
      where: {
        manufacturerId,
        ...(type && { type }),
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        imageUrl: true,
      },
    })
  }

  /**
   * Busca variantes (anos/modelos) por veículo
   */
  async findVariantsByVehicle(vehicleId: string) {
    return prisma.vehicleVariant.findMany({
      where: { vehicleId },
      orderBy: { year: 'desc' },
      select: {
        id: true,
        year: true,
        model: true,
        engineType: true,
        fuelType: true,
      },
    })
  }

  /**
   * Busca anos disponíveis para um veículo
   */
  async findYearsByVehicle(vehicleId: string): Promise<number[]> {
    const variants = await prisma.vehicleVariant.findMany({
      where: { vehicleId },
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    })

    return variants.map((v) => v.year)
  }

  /**
   * Busca hierarquia completa (Montadora -> Veículo -> Variantes)
   */
  async findVehicleHierarchy(vehicleId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        manufacturer: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        variants: {
          orderBy: { year: 'desc' },
          select: {
            id: true,
            year: true,
            model: true,
            engineType: true,
            fuelType: true,
          },
        },
      },
    })

    if (!vehicle) return null

    return {
      manufacturer: vehicle.manufacturer,
      vehicle: {
        id: vehicle.id,
        name: vehicle.name,
        slug: vehicle.slug,
        type: vehicle.type,
      },
      variants: vehicle.variants,
    }
  }

  /**
   * Busca veículos por tipo (Carro, Moto, Caminhão)
   */
  async findByType(type: VehicleType, limit?: number) {
    return prisma.vehicle.findMany({
      where: { type },
      include: {
        manufacturer: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
      orderBy: { name: 'asc' },
      ...(limit && { take: limit }),
    })
  }
}

// Singleton para reutilização
export const vehicleRepository = new VehicleRepository()
