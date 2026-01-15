import { NextRequest } from 'next/server';

/**
 * Rate Limiter simples baseado em memória
 * Para produção, usar Redis ou serviço externo
 */

interface RateLimitConfig {
  interval: number; // Janela de tempo em ms
  maxRequests: number; // Máximo de requisições na janela
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private cache = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Limpar cache a cada 1 minuto
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.resetTime) {
        this.cache.delete(key);
      }
    }
  }

  private getClientIdentifier(request: NextRequest): string {
    // Usar IP do cliente (com fallback)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               'unknown';
    return ip;
  }

  async check(
    request: NextRequest,
    config: RateLimitConfig = { interval: 60000, maxRequests: 10 }
  ): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const identifier = this.getClientIdentifier(request);
    const now = Date.now();
    const resetTime = now + config.interval;

    let entry = this.cache.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Nova janela de tempo
      entry = {
        count: 1,
        resetTime,
      };
      this.cache.set(identifier, entry);

      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - 1,
        reset: resetTime,
      };
    }

    // Incrementar contador
    entry.count++;

    if (entry.count > config.maxRequests) {
      // Limite excedido
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        reset: entry.resetTime,
      };
    }

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - entry.count,
      reset: entry.resetTime,
    };
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

// Singleton
export const rateLimiter = new RateLimiter();

/**
 * Configurações pré-definidas
 */
export const RATE_LIMITS = {
  // APIs públicas - 60 requisições por minuto
  PUBLIC: { interval: 60000, maxRequests: 60 },
  
  // APIs de busca - 30 requisições por minuto
  SEARCH: { interval: 60000, maxRequests: 30 },
  
  // APIs de escrita - 10 requisições por minuto
  WRITE: { interval: 60000, maxRequests: 10 },
  
  // APIs de autenticação - 5 tentativas por 5 minutos
  AUTH: { interval: 300000, maxRequests: 5 },
};
