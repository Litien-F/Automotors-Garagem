import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { SearchParams, PaginatedResponse, ProductWithImages } from '@/types'

/**
 * ProductRepository - Padrão Repository para desacoplar lógica de acesso a dados
 * 
 * Princípios SOLID aplicados:
 * - Single Responsibility: Apenas operações relacionadas a produtos
 * - Dependency Inversion: Dependemos de abstrações (Prisma Client)
 * - Interface Segregation: Métodos específicos e bem definidos
 */
export class ProductRepository {
  /**
   * Busca produtos com filtros complexos e paginação
   */
  async searchProducts(
    params: SearchParams
  ): Promise<PaginatedResponse<ProductWithImages>> {
    const {
      manufacturerId,
      vehicleId,
      variantId,
      categoryId,
      minPrice,
      maxPrice,
      inStock,
      isRare,
      query,
      page = 1,
      pageSize = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params

    // Construir filtros dinâmicos
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { ...{ gte: minPrice }, lte: maxPrice } }),
      ...(inStock && { stock: { gt: 0 } }),
      ...(isRare !== undefined && { isRare }),
      ...(query && {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
          { partNumber: { contains: query, mode: 'insensitive' } },
        ],
      }),
      // Filtro por compatibilidade de veículo
      ...((manufacturerId || vehicleId || variantId) && {
        compatibilities: {
          some: {
            ...(vehicleId && { vehicleId }),
            ...(variantId && { variantId }),
            ...(manufacturerId && {
              vehicle: {
                manufacturerId,
              },
            }),
          },
        },
      }),
    }

    // Calcular skip para paginação
    const skip = (page - 1) * pageSize

    // Executar query com contagem total
    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: { order: 'asc' },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ])

    // Transformar Decimal para number
    const transformedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      weight: product.weight ? Number(product.weight) : null,
    }))

    return {
      data: transformedProducts,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
      },
    }
  }

  /**
   * Busca produto por ID com todas as relações
   */
  async findById(id: bigint): Promise<ProductWithImages | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        compatibilities: {
          include: {
            vehicle: {
              include: {
                manufacturer: true,
              },
            },
            variant: true,
          },
        },
      },
    })

    if (!product) return null

    return {
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      weight: product.weight ? Number(product.weight) : null,
    }
  }

  /**
   * Busca produtos em destaque
   */
  async findFeatured(limit: number = 8): Promise<ProductWithImages[]> {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      weight: product.weight ? Number(product.weight) : null,
    }))
  }

  /**
   * Busca produtos raros/antigos
   */
  async findRare(limit: number = 8): Promise<ProductWithImages[]> {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isRare: true,
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      weight: product.weight ? Number(product.weight) : null,
    }))
  }

  /**
   * Verifica disponibilidade em estoque
   */
  async checkStock(productId: bigint, quantity: number): Promise<boolean> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    })

    return product ? product.stock >= quantity : false
  }
}

// Singleton para reutilização
export const productRepository = new ProductRepository()
