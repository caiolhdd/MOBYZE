import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm";
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
const variants = {
  default: "bg-cyan-300 text-slate-950 hover:bg-cyan-200",
  outline: "border border-cyan-300/50 bg-transparent text-white hover:border-cyan-300 hover:bg-cyan-300/10"
};
const sizes = { default: "px-5 py-3 text-sm", sm: "px-4 py-2 text-xs" };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);
    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, { className: cn(classes, children.props.className) });
    }
    return <button className={classes} ref={ref} {...props}>{children}</button>;
  }
);
Button.displayName = "Button";
