/**
 * Utilitário para serializar BigInt para JSON
 * 
 * O JavaScript não suporta serialização nativa de BigInt.
 * Este helper converte BigInt para Number de forma recursiva.
 */

/**
 * Converte BigInt para Number em um objeto recursivamente
 */
export function serializeBigInt<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return Number(obj) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => serializeBigInt(item)) as T;
  }

  if (typeof obj === 'object') {
    const serialized: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        serialized[key] = serializeBigInt(obj[key]);
      }
    }
    return serialized as T;
  }

  return obj;
}

/**
 * Middleware para NextResponse que serializa BigInt automaticamente
 */
export function jsonResponse<T>(data: T, init?: ResponseInit) {
  const serialized = serializeBigInt(data);
  return Response.json(serialized, init);
}
