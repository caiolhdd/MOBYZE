type IconProps = { size?: number; className?: string };
function makeIcon(symbol: string) { return function Icon({ size = 20, className = "" }: IconProps) { return <span aria-hidden="true" className={`inline-flex items-center justify-center leading-none ${className}`} style={{ fontSize: size * 0.9 }}>{symbol}</span>; }; }
export const ArrowRight = makeIcon("→");
export const Check = makeIcon("✓");
export const Menu = makeIcon("☰");
export const MessageCircle = makeIcon("◌");
export const ShieldCheck = makeIcon("✦");
export const Sparkles = makeIcon("✧");
export const Truck = makeIcon("▰");
export const X = makeIcon("×");
