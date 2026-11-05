import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Produto } from "../../data/schema";
import { Button } from "../../components/ui/button";
import { MAX_COMPARACAO } from "./regras";

type Props = {
  selecionados: Produto[];
  onRemover: (id: string) => void;
  onLimpar: () => void;
  onComparar: () => void;
};

const VAR_ALTURA = "--altura-barra-comparacao";

/** Barra fixa no rodapé enquanto houver aparelhos selecionados para comparar. */
export function BarraComparacao({ selecionados, onRemover, onLimpar, onComparar }: Props) {
  const ref = useRef<HTMLElement>(null);
  const visivel = selecionados.length > 0;

  // Publica a altura real da barra para o body reservar espaço (ver styles.css) e ela não cobrir o rodapé.
  useEffect(() => {
    const el = ref.current;
    const raiz = document.documentElement.style;
    if (!visivel || !el) return;
    const ro = new ResizeObserver(([e]) => raiz.setProperty(VAR_ALTURA, `${e.borderBoxSize[0].blockSize}px`));
    ro.observe(el);
    return () => {
      ro.disconnect();
      raiz.removeProperty(VAR_ALTURA);
    };
  }, [visivel]);

  if (!visivel) return null;
  const faltam = 2 - selecionados.length;

  return (
    <aside ref={ref} aria-label="Comparação de aparelhos" className="fixed inset-x-0 bottom-0 z-30 border-t border-cyan-300/20 bg-[#050b16]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col gap-3 py-3 sm:flex-row sm:items-center">
        <ul className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none]">
          {selecionados.map((p) => (
            <li key={p.id} className="flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/[.04] py-1 pl-3 pr-1 text-sm font-bold">
              {p.nome}
              <button
                type="button"
                onClick={() => onRemover(p.id)}
                aria-label={`Remover ${p.nome} da comparação`}
                className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <X size={14} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <span className="mr-1 hidden text-xs text-slate-400 md:inline" aria-live="polite">
            {faltam > 0 ? `Escolha mais ${faltam} para comparar` : `${selecionados.length} de ${MAX_COMPARACAO}`}
          </span>
          <Button variant="ghost" size="sm" className="min-h-11" onClick={onLimpar}>
            Limpar
          </Button>
          <Button size="sm" className="min-h-11 flex-1 sm:flex-none" onClick={onComparar} disabled={faltam > 0}>
            Comparar ({selecionados.length})
          </Button>
        </div>
      </div>
    </aside>
  );
}
