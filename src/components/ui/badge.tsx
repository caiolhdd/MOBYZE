import * as React from "react";
import { cn } from "../../lib/utils";

/** Etiqueta de categoria dentro de um card. Não é rótulo de seção. */
export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex rounded-control border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 text-xs font-semibold text-cyan-200", className)}>
      {children}
    </span>
  );
}
