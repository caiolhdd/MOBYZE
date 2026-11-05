import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import type { Produto, Vendedor } from "../../data/schema";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { ProdutoCard } from "./ProdutoCard";
import { ProdutoDialog } from "./ProdutoDialog";
import { ORDENACOES, TODOS, filtrarProdutos, isOrdenacao, ordenarGrupos, rotuloGrupo } from "./regras";
import { useFiltroNaUrl } from "./useFiltroNaUrl";

type Props = { produtos: Produto[]; vendedores: Vendedor[] };

export function Catalogo({ produtos, vendedores }: Props) {
  const grupos = useMemo(() => [TODOS, ...ordenarGrupos(produtos.map((p) => p.grupo))], [produtos]);
  const [filtro, atualizar] = useFiltroNaUrl(grupos);
  const visiveis = useMemo(() => filtrarProdutos(produtos, filtro), [produtos, filtro]);
  const [aberto, setAberto] = useState<{ produto: Produto; foco: "detalhes" | "orcamento" } | null>(null);

  const limpar = () => atualizar({ grupo: TODOS, busca: "" });

  return (
    <section id="produtos" aria-labelledby="catalogo-titulo" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 sm:py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge>Seleção especial</Badge>
          <h2 id="catalogo-titulo" className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Escolha o seu próximo aparelho.
          </h2>
        </div>
        <p className="max-w-md text-slate-400">Do iPhone 11 ao lançamento mais recente. Compare os modelos e confirme estoque, cor e condições direto com nosso time.</p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar aparelho</span>
          <Search size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={filtro.busca}
            onChange={(e) => atualizar({ busca: e.target.value })}
            placeholder="Buscar por modelo, chip, armazenamento…"
            className="min-h-12 w-full rounded-full border border-white/15 bg-white/[.04] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus-visible:border-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-400">
          Ordenar
          <select
            value={filtro.ordem}
            onChange={(e) => isOrdenacao(e.target.value) && atualizar({ ordem: e.target.value })}
            className="min-h-12 flex-1 rounded-full border border-white/15 bg-[#07111f] px-4 font-bold text-white focus-visible:border-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
          >
            {Object.entries(ORDENACOES).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div role="group" aria-label="Filtrar por linha" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {grupos.map((g) => {
          const ativo = filtro.grupo === g;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={ativo}
              onClick={() => atualizar({ grupo: g })}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030711]",
                ativo ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/15 text-slate-300 hover:border-cyan-300/70 hover:text-cyan-200",
              )}
            >
              {rotuloGrupo(g)}
            </button>
          );
        })}
      </div>

      <p role="status" className="mb-4 text-sm text-slate-400">
        {visiveis.length === 1 ? "1 aparelho encontrado" : `${visiveis.length} aparelhos encontrados`}
      </p>

      {visiveis.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visiveis.map((p) => (
            <li key={p.id} className="flex">
              <ProdutoCard produto={p} onAbrir={(produto, foco) => setAberto({ produto, foco })} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid place-items-center rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
          <SearchX size={32} aria-hidden className="text-slate-500" />
          <p className="mt-3 font-bold">Nenhum aparelho encontrado.</p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">Tente outro termo ou fale com um vendedor — podemos ter o modelo fora do catálogo.</p>
          <Button variant="outline" className="mt-5" onClick={limpar}>
            Limpar filtros
          </Button>
        </div>
      )}

      <ProdutoDialog produto={aberto?.produto ?? null} foco={aberto?.foco ?? "detalhes"} vendedores={vendedores} onClose={() => setAberto(null)} />
    </section>
  );
}
