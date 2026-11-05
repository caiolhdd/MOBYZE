import type { SVGProps } from "react";
import type { IconName } from "../data/services";

/** Um set só, traço de 1.75 em grade 24. */
const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true
};

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const ArrowDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 4v15M6 13l6 6 6-6" /></svg>
);
export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>
);
export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><path d="M16.8 7.2h.01" /></svg>
);

const serviceIcons: Record<IconName, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  browser: (p) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9.5h18M6.5 7.25h.01M9 7.25h.01" /></svg>),
  target: (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12h.01" /></svg>),
  phone: (p) => (<svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></svg>),
  layers: (p) => (<svg {...base} {...p}><path d="M12 4l9 5-9 5-9-5 9-5z" /><path d="M3 14l9 5 9-5" /></svg>)
};

export function ServiceIcon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return serviceIcons[name](props);
}
