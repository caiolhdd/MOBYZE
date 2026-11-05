import { useState } from "react";
import { LinkButton } from "../components/Button";
import { CloseIcon, MenuIcon } from "../components/Icons";
import { Logo } from "../components/Logo";
import { channel, defaultMessage } from "../lib/contact";

const links = [
  { href: "#servicos", label: "O que criamos" },
  { href: "#caminho", label: "Por onde começar" },
  { href: "#contato", label: "Contato" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        <a href="#inicio" aria-label="Mobyze, início" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.9rem] font-semibold text-muted-navy transition-colors hover:text-cream">
              {l.label}
            </a>
          ))}
          <LinkButton href={channel.href(defaultMessage)} target="_blank" rel="noopener noreferrer" className="!px-5 !py-2.5 !text-[0.875rem]">
            Pedir orçamento
          </LinkButton>
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal" className="border-t border-line bg-ink px-5 pb-6 pt-2 md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <a href={l.href} onClick={() => setOpen(false)} className="block py-4 text-lg font-semibold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LinkButton href={channel.href(defaultMessage)} target="_blank" rel="noopener noreferrer" arrow className="mt-6 w-full">
            Pedir orçamento pelo {channel.label}
          </LinkButton>
        </nav>
      )}
    </header>
  );
}
