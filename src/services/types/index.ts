import { VehicleType, OrderStatus, UserRole } from '@prisma/client'

// ==================== API Response Types ====================

export interface ApiResponse<T = any> {
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
  manufacturerId?: string
  vehicleId?: string
  variantId?: string
  categoryId?: string
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
  id: string
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
    id: string
    url: string
    alt: string | null
    order: number
  }[]
  category: {
    id: string
    name: string
    slug: string
  }
}

// ==================== Vehicle Types ====================

export interface VehicleHierarchy {
  manufacturer: {
    id: string
    name: string
    slug: string
  }
  vehicle: {
    id: string
    name: string
    slug: string
    type: VehicleType
  }
  variants: {
    id: string
    year: number
    model: string | null
    engineType: string | null
  }[]
}

// ==================== Cart Types ====================

export interface CartItemWithProduct {
  id: string
  quantity: number
  product: {
    id: string
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
  manufacturerId: string
  vehicleId: string
  year: number
  variantId?: string
}

export { VehicleType, OrderStatus, UserRole }
