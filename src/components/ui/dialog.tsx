import { X } from "../icons";
import { createContext, useContext } from "react";
type DialogState = { open: boolean; onOpenChange: (open: boolean) => void };
const DialogContext = createContext<DialogState>({ open: false, onOpenChange: () => {} });
export function Dialog({ open, onOpenChange, children }: DialogState & { children: React.ReactNode }) { return <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>; }
export function DialogContent({ className = "", children }: { className?: string; children: React.ReactNode }) { const { open, onOpenChange } = useContext(DialogContext); if (!open) return null; return <><div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} /><div className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-h-[90vh] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-cyan-300/20 bg-[#07111f] p-6 text-white shadow-2xl ${className}`}>{children}<button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Fechar"><X size={18}/></button></div></>; }
export function DialogTitle({ className = "", children }: { className?: string; children: React.ReactNode }) { return <h2 className={className}>{children}</h2>; }
