import { PrismaClient, VehicleType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes (cuidado em produção!)
  await prisma.vehicleCompatibility.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.vehicleVariant.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.manufacturer.deleteMany()

  console.log('✅ Dados antigos removidos')

  // Criar Montadoras
  const manufacturers = await Promise.all([
    prisma.manufacturer.create({
      data: {
        name: 'Volkswagen',
        slug: 'volkswagen',
        country: 'Alemanha',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Chevrolet',
        slug: 'chevrolet',
        country: 'Estados Unidos',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Fiat',
        slug: 'fiat',
        country: 'Itália',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Ford',
        slug: 'ford',
        country: 'Estados Unidos',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Honda',
        slug: 'honda',
        country: 'Japão',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Toyota',
        slug: 'toyota',
        country: 'Japão',
      },
    }),
  ])

  console.log('✅ Montadoras criadas')

  // Criar Veículos
  const vehicles = await Promise.all([
    // Volkswagen
    prisma.vehicle.create({
      data: {
        name: 'Gol',
        slug: 'gol',
        type: VehicleType.CAR,
        manufacturerId: manufacturers[0].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Fusca',
        slug: 'fusca',
        type: VehicleType.CAR,
        manufacturerId: manufacturers[0].id,
      },
    }),
    // Chevrolet
    prisma.vehicle.create({
      data: {
        name: 'Onix',
        slug: 'onix',
        type: VehicleType.CAR,
        manufacturerId: manufacturers[1].id,
      },
    }),
    // Fiat
    prisma.vehicle.create({
      data: {
        name: 'Uno',
        slug: 'uno',
        type: VehicleType.CAR,
        manufacturerId: manufacturers[2].id,
      },
    }),
    // Honda
    prisma.vehicle.create({
      data: {
        name: 'Civic',
        slug: 'civic',
        type: VehicleType.CAR,
        manufacturerId: manufacturers[4].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'CG 160',
        slug: 'cg-160',
        type: VehicleType.MOTORCYCLE,
        manufacturerId: manufacturers[4].id,
      },
    }),
    // Toyota
    prisma.vehicle.create({
      data: {
        name: 'Corolla',
        slug: 'corolla',
        type: VehicleType.CAR,
        manufacturerId: manufacturers[5].id,
      },
    }),
  ])

  console.log('✅ Veículos criados')

  // Criar Variantes (Anos/Modelos)
  const variants = await Promise.all([
    // Gol
    prisma.vehicleVariant.create({
      data: {
        vehicleId: vehicles[0].id,
        year: 2020,
        model: '1.0',
        engineType: '1.0 12V',
        fuelType: 'Flex',
      },
    }),
    prisma.vehicleVariant.create({
      data: {
        vehicleId: vehicles[0].id,
        year: 2021,
        model: '1.6',
        engineType: '1.6 16V',
        fuelType: 'Flex',
      },
    }),
    // Fusca (carro antigo)
    prisma.vehicleVariant.create({
      data: {
        vehicleId: vehicles[1].id,
        year: 1975,
        model: 'Padrão',
        engineType: '1.3',
        fuelType: 'Gasolina',
      },
    }),
    // Civic
    prisma.vehicleVariant.create({
      data: {
        vehicleId: vehicles[4].id,
        year: 2022,
        model: 'EX',
        engineType: '2.0 16V',
        fuelType: 'Gasolina',
      },
    }),
  ])

  console.log('✅ Variantes criadas')

  // Criar Categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Motor',
        slug: 'motor',
        description: 'Peças relacionadas ao motor',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Freios',
        slug: 'freios',
        description: 'Sistema de freios',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Suspensão',
        slug: 'suspensao',
        description: 'Sistema de suspensão',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Elétrica',
        slug: 'eletrica',
        description: 'Sistema elétrico',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Carroceria',
        slug: 'carroceria',
        description: 'Peças de carroceria',
      },
    }),
  ])

  console.log('✅ Categorias criadas')

  // Criar Produtos
  const products = await Promise.all([
    // Produto 1 - Pastilha de Freio
    prisma.product.create({
      data: {
        sku: 'PF-001',
        name: 'Pastilha de Freio Dianteira',
        slug: 'pastilha-freio-dianteira',
        description: 'Pastilha de freio dianteira de alta qualidade, compatível com diversos modelos.',
        price: 89.90,
        compareAtPrice: 120.00,
        stock: 50,
        isActive: true,
        isFeatured: true,
        brand: 'Bosch',
        partNumber: 'BN-1234',
        categoryId: categories[1].id,
        images: {
          create: [
            {
              url: 'https://via.placeholder.com/600x400/1a1a1a/f97316?text=Pastilha+Freio',
              alt: 'Pastilha de Freio Dianteira',
              order: 0,
            },
          ],
        },
        compatibilities: {
          create: [
            { vehicleId: vehicles[0].id, variantId: variants[0].id },
            { vehicleId: vehicles[2].id },
          ],
        },
      },
    }),
    // Produto 2 - Filtro de Óleo
    prisma.product.create({
      data: {
        sku: 'FO-002',
        name: 'Filtro de Óleo',
        slug: 'filtro-oleo',
        description: 'Filtro de óleo original, alta eficiência de filtragem.',
        price: 35.00,
        stock: 100,
        isActive: true,
        isFeatured: true,
        brand: 'Mann Filter',
        partNumber: 'MF-5678',
        categoryId: categories[0].id,
        images: {
          create: [
            {
              url: 'https://via.placeholder.com/600x400/1a1a1a/0ea5e9?text=Filtro+Oleo',
              alt: 'Filtro de Óleo',
              order: 0,
            },
          ],
        },
        compatibilities: {
          create: [
            { vehicleId: vehicles[0].id },
            { vehicleId: vehicles[2].id },
            { vehicleId: vehicles[4].id },
          ],
        },
      },
    }),
    // Produto 3 - Amortecedor (Raro - Fusca)
    prisma.product.create({
      data: {
        sku: 'AM-003',
        name: 'Amortecedor Dianteiro Fusca',
        slug: 'amortecedor-fusca',
        description: 'Amortecedor dianteiro original para Fusca. Peça rara de colecionador.',
        price: 450.00,
        compareAtPrice: 600.00,
        stock: 5,
        isActive: true,
        isFeatured: true,
        isRare: true,
        brand: 'Cofap',
        partNumber: 'CF-FUSCA-75',
        categoryId: categories[2].id,
        images: {
          create: [
            {
              url: 'https://via.placeholder.com/600x400/1a1a1a/f97316?text=Amortecedor+Fusca',
              alt: 'Amortecedor Fusca',
              order: 0,
            },
          ],
        },
        compatibilities: {
          create: [{ vehicleId: vehicles[1].id, variantId: variants[2].id }],
        },
      },
    }),
    // Produto 4 - Bateria
    prisma.product.create({
      data: {
        sku: 'BT-004',
        name: 'Bateria 60Ah',
        slug: 'bateria-60ah',
        description: 'Bateria automotiva 60Ah, 12V. Garantia de 18 meses.',
        price: 380.00,
        stock: 30,
        isActive: true,
        brand: 'Moura',
        partNumber: 'MR-60AH',
        categoryId: categories[3].id,
        images: {
          create: [
            {
              url: 'https://via.placeholder.com/600x400/1a1a1a/0ea5e9?text=Bateria',
              alt: 'Bateria 60Ah',
              order: 0,
            },
          ],
        },
        compatibilities: {
          create: [
            { vehicleId: vehicles[0].id },
            { vehicleId: vehicles[2].id },
            { vehicleId: vehicles[3].id },
          ],
        },
      },
    }),
    // Produto 5 - Farol
    prisma.product.create({
      data: {
        sku: 'FL-005',
        name: 'Farol Dianteiro LED',
        slug: 'farol-led',
        description: 'Farol dianteiro com tecnologia LED. Maior visibilidade e economia.',
        price: 650.00,
        compareAtPrice: 850.00,
        stock: 15,
        isActive: true,
        isFeatured: true,
        brand: 'Arteb',
        partNumber: 'AT-LED-001',
        categoryId: categories[4].id,
        images: {
          create: [
            {
              url: 'https://via.placeholder.com/600x400/1a1a1a/f97316?text=Farol+LED',
              alt: 'Farol LED',
              order: 0,
            },
          ],
        },
        compatibilities: {
          create: [{ vehicleId: vehicles[4].id, variantId: variants[3].id }],
        },
      },
    }),
  ])

  console.log('✅ Produtos criados')

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log(`📊 Resumo:`)
  console.log(`   - ${manufacturers.length} montadoras`)
  console.log(`   - ${vehicles.length} veículos`)
  console.log(`   - ${variants.length} variantes`)
  console.log(`   - ${categories.length} categorias`)
  console.log(`   - ${products.length} produtos`)
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
