import { z } from 'zod';

/**
 * Schemas de validação para APIs
 * Garante que entradas sejam válidas e seguras
 */

// Schema para paginação
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().max(1000).default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Schema para busca de produtos em destaque
export const featuredProductsSchema = z.object({
  limit: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 8))
    .pipe(z.number().int().positive().max(50)),
});

// Schema para busca de produtos
export const searchProductsSchema = z.object({
  query: z.string().max(200).optional(),
  categoryId: z.coerce.bigint().positive().optional(),
  manufacturerId: z.coerce.bigint().positive().optional(),
  vehicleId: z.coerce.bigint().positive().optional(),
  variantId: z.coerce.bigint().positive().optional(),
  minPrice: z.coerce.number().nonnegative().max(1000000).optional(),
  maxPrice: z.coerce.number().nonnegative().max(1000000).optional(),
  inStock: z.coerce.boolean().optional(),
  isRare: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().max(1000).default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  sortBy: z.enum(['price', 'name', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Schema para ID de produto
export const productIdSchema = z.object({
  id: z.coerce.bigint().positive(),
});

// Schema para ID de fabricante
export const manufacturerIdSchema = z.object({
  manufacturerId: z.coerce.bigint().positive(),
});

// Validação customizada para preços
export const priceRangeSchema = z
  .object({
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: 'minPrice deve ser menor ou igual a maxPrice',
    }
  );
