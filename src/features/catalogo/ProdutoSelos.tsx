import type { Produto } from "../../data/schema";
import { cn } from "../../lib/utils";

const base = "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold leading-none";

/** Condição e disponibilidade — o que mais pesa na decisão de compra de um aparelho. */
export function ProdutoSelos({ produto, className }: { produto: Produto; className?: string }) {
  const esgotado = produto.disponivel === false;
  if (!produto.condicao && !esgotado) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {produto.condicao && (
        <span className={cn(base, produto.condicao === "novo" ? "bg-emerald-400/15 text-emerald-200" : "bg-amber-300/15 text-amber-100")}>
          {produto.condicao === "novo" ? "Novo" : "Seminovo"}
          {produto.condicao === "seminovo" && produto.bateria !== undefined && ` · bateria ${produto.bateria}%`}
        </span>
      )}
      {esgotado && <span className={cn(base, "bg-white/10 text-slate-300")}>Esgotado</span>}
    </div>
  );
}

export function ProdutoPreco({ produto, className }: { produto: Produto; className?: string }) {
  return produto.preco ? (
    <span className={cn("font-black text-cyan-200", className)}>{produto.preco}</span>
  ) : (
    <span className={cn("font-bold text-slate-400", className)}>Sob consulta</span>
  );
}
