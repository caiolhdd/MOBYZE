/** Sub-apps servidas sob um prefixo de caminho. Tudo o que não casar aqui é o site da Mobyze. */
export const PREFIXO_CHIQCELL = "/chiqcell";

export function ehRotaChiqcell(pathname: string): boolean {
  return pathname === PREFIXO_CHIQCELL || pathname.startsWith(`${PREFIXO_CHIQCELL}/`);
}
