/**
 * Utility para serializar BigInt em JSON
 * Converte valores BigInt para string para evitar erro de serialização
 */
export function jsonResponse<T = unknown>(data: T, status: number = 200): Response {
  const replacer = (_key: string, value: unknown): unknown =>
    typeof value === 'bigint' ? value.toString() : value;

  return new Response(JSON.stringify(data, replacer), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
