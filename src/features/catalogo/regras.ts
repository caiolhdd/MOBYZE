import type { Produto, Vendedor } from "../../data/schema";

export const TODOS = "todos";

export const ORDENACOES = {
  recentes: "Mais recentes",
  antigos: "Mais antigos",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
} as const;
export type Ordenacao = keyof typeof ORDENACOES;
export const ORDENACAO_PADRAO: Ordenacao = "recentes";
export const isOrdenacao = (v: string | null): v is Ordenacao => !!v && v in ORDENACOES;

const ehLinhaNumerica = (g: string) => /^\d+$/.test(g);
export const ehApple = (p: Pick<Produto, "grupo">) => p.grupo !== "Xiaomi";

export function rotuloGrupo(g: string): string {
  if (g === TODOS) return "Todos";
  if (g === "SE") return "iPhone SE";
  return ehLinhaNumerica(g) ? `iPhone ${g}` : g;
}

/** Linhas numéricas em ordem crescente, depois SE, depois demais marcas — independente da ordem do JSON. */
export function ordenarGrupos(grupos: Iterable<string>): string[] {
  const peso = (g: string) => (ehLinhaNumerica(g) ? 0 : g === "SE" ? 1 : 2);
  return [...new Set(grupos)].sort((a, b) => peso(a) - peso(b) || (peso(a) === 0 ? Number(a) - Number(b) : a.localeCompare(b, "pt-BR")));
}

/** "R$ 2.999,90" -> 2999.9; sem preço -> null. */
export function precoNumerico(preco?: string): number | null {
  if (!preco) return null;
  const n = Number(preco.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
}

const normalizar = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export type Filtro = { grupo: string; busca: string; ordem: Ordenacao };

export function filtrarProdutos(produtos: Produto[], { grupo, busca, ordem }: Filtro): Produto[] {
  const termos = normalizar(busca).split(/\s+/).filter(Boolean);
  const lista = produtos
    .map((p, indice) => ({ p, indice }))
    .filter(({ p }) => grupo === TODOS || p.grupo === grupo)
    .filter(({ p }) => {
      if (!termos.length) return true;
      const alvo = normalizar([p.nome, p.chip, p.arm, rotuloGrupo(p.grupo), ...p.itens].filter(Boolean).join(" "));
      return termos.every((t) => alvo.includes(t));
    });

  const ano = (p: Produto) => Number(p.lanc) || 0;
  // Itens sem preço vão sempre para o fim na ordenação por preço; empate mantém a ordem do cadastro (estável).
  const porPreco = (dir: 1 | -1) => (a: Produto, b: Produto) => {
    const pa = precoNumerico(a.preco), pb = precoNumerico(b.preco);
    if (pa === null || pb === null) return (pa === null ? 1 : 0) - (pb === null ? 1 : 0);
    return (pa - pb) * dir;
  };
  const cmp: Record<Ordenacao, (a: Produto, b: Produto) => number> = {
    recentes: (a, b) => ano(b) - ano(a),
    antigos: (a, b) => (ano(a) || Infinity) - (ano(b) || Infinity),
    "menor-preco": porPreco(1),
    "maior-preco": porPreco(-1),
  };
  return lista.sort((a, b) => cmp[ordem](a.p, b.p) || a.indice - b.indice).map(({ p }) => p);
}

export function linkWhatsApp(v: Vendedor, produto?: Produto | null): string {
  const texto = produto
    ? `Olá, ${v.nome}! Tenho interesse no ${produto.nome} e gostaria de solicitar um orçamento.`
    : `Olá, ${v.nome}! Acessei o site da CHIQ CELL e gostaria de solicitar um orçamento.`;
  return `https://wa.me/${v.telefone}?text=${encodeURIComponent(texto)}`;
}

export function especificacoes(p: Produto): [string, string][] {
  const linhas: [string, string | undefined][] = [
    ["Lançamento", p.lanc],
    ["Chip", p.chip],
    ["Tela", p.tela],
    ["Câmeras traseiras", p.camera],
    ["Câmera frontal", p.frontal],
    ["Armazenamento", p.arm],
    ["Cores", p.cores],
    ["Saúde da bateria", p.bateria !== undefined ? `${p.bateria}%` : undefined],
  ];
  return linhas.filter((l): l is [string, string] => !!l[1]);
}
