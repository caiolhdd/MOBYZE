import { Check } from "lucide-react";
import type { Produto } from "../../data/schema";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { ProdutoArte } from "./ProdutoArte";
import { ProdutoPreco, ProdutoSelos } from "./ProdutoSelos";
import { ehApple } from "./regras";

type Props = { produto: Produto; onAbrir: (p: Produto, origem: "detalhes" | "orcamento") => void };

export function ProdutoCard({ produto, onAbrir }: Props) {
  const resumo = [produto.chip, produto.arm].filter(Boolean).join(" · ");
  return (
    <Card className="product-card flex w-full min-w-0 flex-col p-3 sm:p-4">
      <ProdutoArte produto={produto} />
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
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
