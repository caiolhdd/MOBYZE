import * as React from "react";
import { createContext, useContext, useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

type DialogState = { open: boolean; onOpenChange: (open: boolean) => void };
type DialogContextValue = DialogState & { titleId: string };

const DialogContext = createContext<DialogContextValue>({ open: false, onOpenChange: () => {}, titleId: "" });

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Dialog({ open, onOpenChange, children }: DialogState & { children: React.ReactNode }) {
  const titleId = useId();
  return <DialogContext.Provider value={{ open, onOpenChange, titleId }}>{children}</DialogContext.Provider>;
}

export function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, onOpenChange, titleId } = useContext(DialogContext);
  const panelRef = useRef<HTMLDivElement>(null);

  // Foco entra no diálogo, Esc fecha, Tab fica preso e o foco volta para quem abriu.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onOpenChange(false);
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return event.preventDefault();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/80" onClick={() => onOpenChange(false)} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn("fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-surface border border-cyan-300/20 bg-ink-panel p-6 text-white shadow-2xl focus:outline-none", className)}
      >
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-control p-2 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
    </>
  );
}

export function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  const { titleId } = useContext(DialogContext);
  return <h2 id={titleId} className={className}>{children}</h2>;
}
