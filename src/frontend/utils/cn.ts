import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility para mesclar classes do Tailwind CSS de forma inteligente
 * Evita conflitos e duplicações
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
