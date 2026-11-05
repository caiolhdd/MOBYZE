import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = { as?: ElementType; index?: number; className?: string; children: ReactNode };

export function Reveal({ as: Tag = "div", index = 0, className = "", children }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
