/**
 * Utility para serializar BigInt em JSON
 */
export function jsonResponse(data: any, status: number = 200) {
  const replacer = (key: string, value: any) =>
    typeof value === 'bigint' ? value.toString() : value;

  return new Response(JSON.stringify(data, replacer), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
