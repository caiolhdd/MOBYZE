import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Modal sobre <dialog> nativo: focus trap, Esc, inert do fundo e devolução de foco
 * ao elemento de origem vêm do navegador — sem reimplementar acessibilidade à mão.
 */
export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      el.scrollTop = 0;
      document.documentElement.style.overflow = "hidden";
    } else if (!open && el.open) {
      el.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // "close" cobre Esc e form[method=dialog]; mantém o estado React como fonte da verdade.
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        "dialog m-auto max-h-[min(90dvh,860px)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl border border-cyan-300/20 bg-[#07111f] p-0 text-white shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm",
        className,
      )}
    >
      {open && (
        <>
          {/* Cabeçalho fixo: título e "Fechar" continuam visíveis quando o conteúdo rola (ex.: abrir direto no orçamento). */}
          <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-white/10 bg-[#07111f]/95 px-6 py-4 backdrop-blur sm:px-7">
            <h2 id={titleId} className="text-xl font-black leading-tight sm:text-2xl">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Fechar"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <div className="px-6 pb-6 sm:px-7 sm:pb-7">{children}</div>
        </>
      )}
    </dialog>
  );
}
