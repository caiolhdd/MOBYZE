type Props = { className?: string; withWordmark?: boolean };

/**
 * Monograma MZ desenhado como stand-in. Troque por public/img/logo-mobyze.svg
 * quando o arquivo oficial da marca estiver no projeto.
 */
export function Logo({ className = "", withWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 40" width="40" height="25" fill="none" stroke="currentColor" strokeWidth="5.5" aria-hidden="true">
        <path d="M4 36V6l14 17L32 6v30" />
        <path d="M38 6h22L38 36h22" />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-extrabold tracking-[0.14em]">MOBYZE</span>
          <span className="mt-1 text-[0.625rem] font-medium tracking-[0.2em] text-muted-navy [.on-cream_&]:text-muted-cream">
            SITES &amp; APLICATIVOS
          </span>
        </span>
      )}
    </span>
  );
}
