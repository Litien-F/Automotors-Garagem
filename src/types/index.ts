import { VehicleType, OrderStatus, UserRole } from '@prisma/client'

// ==================== API Response Types ====================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    totalItems: number
  }
}

// ==================== Search & Filter Types ====================

export interface SearchFilters {
  manufacturerId?: bigint
  vehicleId?: bigint
  variantId?: bigint
  categoryId?: bigint
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isRare?: boolean
  query?: string
}

export interface SearchParams extends SearchFilters {
  page?: number
  pageSize?: number
  sortBy?: 'price' | 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

// ==================== Product Types ====================

export interface ProductWithImages {
  id: bigint
  sku: string
  name: string
  slug: string
  description: string | null
  price: number
  compareAtPrice: number | null
  stock: number
  isActive: boolean
  isFeatured: boolean
  isRare: boolean
  brand: string | null
  partNumber: string | null
  images: {
    id: bigint
    url: string
    alt: string | null
    order: number
  }[]
  category: {
    id: bigint
    name: string
    slug: string
  }
}

// ==================== Vehicle Types ====================

export interface VehicleHierarchy {
  manufacturer: {
    id: bigint
    name: string
    slug: string
  }
  vehicle: {
    id: bigint
    name: string
    slug: string
    type: VehicleType
  }
  variants: {
    id: bigint
    year: number
    model: string | null
    engineType: string | null
  }[]
}

// ==================== Cart Types ====================

export interface CartItemWithProduct {
  id: bigint
  quantity: number
  product: {
    id: bigint
    name: string
    price: number
    stock: number
    images: {
      url: string
      alt: string | null
    }[]
  }
}

// ==================== Component Props Types ====================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export interface SelectOption {
  value: string
  label: string
}

// ==================== Form Types ====================

export interface SearchFormData {
  manufacturerId: bigint
  vehicleId: bigint
  year: number
  variantId?: bigint
}

export { VehicleType, OrderStatus, UserRole }
