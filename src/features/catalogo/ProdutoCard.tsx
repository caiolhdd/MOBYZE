import { Check, Plus } from "lucide-react";
import type { Produto } from "../../data/schema";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { ProdutoArte } from "./ProdutoArte";
import { ProdutoPreco, ProdutoSelos } from "./ProdutoSelos";
import { ehApple } from "./regras";

type Props = {
  produto: Produto;
  onAbrir: (p: Produto, origem: "detalhes" | "orcamento") => void;
  comparando: boolean;
  /** false quando o limite de comparação já foi atingido por outros produtos. */
  podeComparar: boolean;
  onAlternarComparacao: (id: string) => void;
};

export function ProdutoCard({ produto, onAbrir, comparando, podeComparar, onAlternarComparacao }: Props) {
  const resumo = [produto.chip, produto.arm].filter(Boolean).join(" · ");
  return (
    <Card className="product-card flex w-full min-w-0 flex-col p-3 sm:p-4">
      <div className="relative">
        <ProdutoArte produto={produto} />
        <button
          type="button"
          aria-pressed={comparando}
          disabled={!comparando && !podeComparar}
          onClick={() => onAlternarComparacao(produto.id)}
          aria-label={`Comparar ${produto.nome}`}
          title={!comparando && !podeComparar ? "Limite de 3 aparelhos na comparação" : undefined}
          className={cn(
            "absolute right-2 top-2 inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-full border px-3 text-xs font-bold shadow-lg backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-40",
            comparando ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/25 bg-slate-950/60 text-white hover:border-cyan-300",
          )}
        >
          {comparando ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
          <span aria-hidden className="hidden sm:inline">
            Comparar
          </span>
        </button>
      </div>
      <div className="mt-3">
        <Badge>{ehApple(produto) ? "iPhone" : produto.grupo}{produto.lanc && ` · ${produto.lanc}`}</Badge>
      </div>
      <h3 className="mt-2 text-base font-extrabold leading-snug sm:text-lg">{produto.nome}</h3>
      <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{resumo || "Consulte os modelos"}</p>
      <ProdutoSelos produto={produto} className="mt-2" />
      <ProdutoPreco produto={produto} className="mt-2 text-lg" />
      <ul className="my-3 hidden space-y-1.5 text-sm text-slate-300 sm:block">
        {produto.itens.map((f) => (
          <li key={f} className="flex gap-2">
            <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-cyan-300" />
            {f}
          </li>
        ))}
      </ul>
      {/* mt-auto alinha os botões na base, independentemente do tamanho do conteúdo */}
      <div className="mt-auto grid gap-2 pt-2">
        <Button variant="outline" className="min-h-11 w-full" onClick={() => onAbrir(produto, "detalhes")} aria-label={`Ver características do ${produto.nome}`}>
          Ver características
        </Button>
        <Button className="min-h-11 w-full" onClick={() => onAbrir(produto, "orcamento")} aria-label={`Solicitar orçamento do ${produto.nome}`}>
          {produto.disponivel === false ? "Consultar reposição" : "Pedir orçamento"}
        </Button>
      </div>
    </Card>
  );
}
