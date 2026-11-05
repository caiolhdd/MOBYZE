import { useEffect, useRef } from "react";
import { Check, MessageCircle } from "lucide-react";
import type { Produto, Vendedor } from "../../data/schema";
import { Dialog } from "../../components/ui/dialog";
import { ProdutoArte } from "./ProdutoArte";
import { ProdutoPreco, ProdutoSelos } from "./ProdutoSelos";
import { ehApple, especificacoes, linkWhatsApp } from "./regras";

type Props = {
  produto: Produto | null;
  /** "orcamento" rola direto para a escolha do vendedor. */
  foco: "detalhes" | "orcamento";
  vendedores: Vendedor[];
  onClose: () => void;
};

export function ProdutoDialog({ produto, foco, vendedores, onClose }: Props) {
  const orcamentoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (produto && foco === "orcamento") {
      const alvo = orcamentoRef.current;
      alvo?.scrollIntoView({ block: "start" });
      alvo?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    }
  }, [produto, foco]);

  return (
    <Dialog open={!!produto} onClose={onClose} title={produto?.nome}>
      {produto && (
        <>
          <p className="mt-4 text-xs font-bold uppercase tracking-[.18em] text-cyan-300">{ehApple(produto) ? "Apple" : produto.grupo}</p>
          <ProdutoArte produto={produto} eager className="mt-4 aspect-[16/9]" />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <ProdutoPreco produto={produto} className="text-2xl" />
            <ProdutoSelos produto={produto} />
          </div>

          {especificacoes(produto).length ? (
            <dl className="mt-5 divide-y divide-white/10 rounded-2xl bg-white/[.04] px-4 text-sm">
              {especificacoes(produto).map(([k, v]) => (
                <div key={k} className="grid gap-0.5 py-3 sm:grid-cols-[150px_1fr] sm:gap-3">
                  <dt className="text-slate-400">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 text-sm text-slate-400">Consulte os modelos disponíveis com nossos vendedores.</p>
          )}

          {produto.itens.length > 0 && (
            <>
              <h3 className="mt-6 font-extrabold">Destaques</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {produto.itens.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-cyan-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          <section ref={orcamentoRef} aria-labelledby="orcamento-titulo" className="mt-7 scroll-mt-24 border-t border-white/10 pt-5">
            <h3 id="orcamento-titulo" className="font-extrabold">
              {produto.disponivel === false ? "Consultar reposição com" : "Pedir orçamento com"}
            </h3>
            <p className="mt-1 text-xs text-slate-400">A mensagem já vai com o {produto.nome}. Disponibilidade, cor, condição e valores são confirmados pelo vendedor.</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {vendedores.map((v) => (
                <li key={v.telefone}>
                  <a
                    href={linkWhatsApp(v, produto)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm font-bold transition hover:border-emerald-300/60 hover:bg-emerald-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <MessageCircle size={18} aria-hidden className="shrink-0 text-emerald-300" />
                    <span className="min-w-0 truncate">{v.nome}</span>
                    <span className="sr-only"> (abre o WhatsApp)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </Dialog>
  );
}
