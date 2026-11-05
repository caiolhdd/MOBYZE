import { cn } from "../../lib/utils";
export function Badge({ className, children }: { className?: string; children: React.ReactNode }) { return <span className={cn("inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-200", className)}>{children}</span>; }
