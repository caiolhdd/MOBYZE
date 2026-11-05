import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "solid" | "link";
type Common = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode };

const styles: Record<Variant, string> = {
  /* Ação principal: off-white sobre azul. O off-white é o único acento da página. */
  solid:
    "rounded-md bg-cream px-6 py-3.5 text-[0.95rem] font-bold text-ink hover:bg-white [.on-cream_&]:bg-ink [.on-cream_&]:text-cream [.on-cream_&]:hover:bg-navy",
  link: "px-1 py-2 text-[0.95rem] font-semibold underline decoration-1 underline-offset-[6px] decoration-steel hover:decoration-current"
};

const base = "group inline-flex items-center justify-center gap-2.5 transition-colors duration-150";

function Inner({ arrow, children }: { arrow?: boolean; children: ReactNode }) {
  return (
    <>
      {children}
      {arrow && <ArrowRight width={18} height={18} className="transition-transform duration-150 group-hover:translate-x-0.5" />}
    </>
  );
}

export function LinkButton({ variant = "solid", arrow, className = "", children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} className={`${base} ${styles[variant]} ${className}`}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}

export function Button({ variant = "solid", arrow, className = "", children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`${base} ${styles[variant]} ${className}`}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
