/**
 * Dados da loja usados em mais de um lugar.
 * TODO(dono da loja): trocar os valores abaixo pelos reais antes de publicar.
 * O número é só dígitos, com código do país e DDD (ex.: 5511999999999).
 */
export const STORE = {
  whatsappNumber: "5500000000000",
  address: "Rua da Loja, 123",
  hours: "Seg a Sáb, 9h às 18h"
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
