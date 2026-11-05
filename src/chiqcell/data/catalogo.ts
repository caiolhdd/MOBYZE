import base from "./catalogo.json";
import { catalogoSchema, type Catalogo, type Produto } from "./schema";

/** Chave usada pelo painel (admin.html) para pré-visualizar alterações neste navegador. */
export const CHAVE_RASCUNHO = "chiqcell_dados";

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function comIds(produtos: Omit<Produto, "id">[]): Produto[] {
  const vistos = new Map<string, number>();
  return produtos.map((p) => {
    const raiz = slug(p.nome) || "produto";
    const n = vistos.get(raiz) ?? 0;
    vistos.set(raiz, n + 1);
    return { ...p, id: n ? `${raiz}-${n + 1}` : raiz };
  });
}

function parse(dados: unknown): Catalogo {
  const c = catalogoSchema.parse(dados);
  return { ...c, produtos: comIds(c.produtos) };
}

/** Rascunho salvo pelo painel; inválido ou inacessível => ignorado. Formato legado (LOJA/VENDEDORES/PRODUTOS) é aceito. */
function lerRascunho(): Catalogo | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE_RASCUNHO);
    if (!bruto) return null;
    const d = JSON.parse(bruto);
    const normalizado = "LOJA" in d ? { loja: d.LOJA, vendedores: d.VENDEDORES, produtos: d.PRODUTOS } : d;
    const r = catalogoSchema.safeParse(normalizado);
    if (!r.success) {
      console.warn("[catálogo] rascunho do painel inválido, usando dados publicados.", r.error.flatten());
      return null;
    }
    return { ...r.data, produtos: comIds(r.data.produtos) };
  } catch {
    return null;
  }
}

/** Dados publicados são validados no carregamento: erro de digitação no JSON quebra o build/dev, não o cliente em silêncio. */
const publicado = parse(base);

export const catalogo: Catalogo = (import.meta.env.DEV && lerRascunho()) || publicado;
