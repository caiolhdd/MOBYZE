import type { CSSProperties } from "react";
import { LinkButton } from "../components/Button";
import { ArrowDown } from "../components/Icons";
import { channel, defaultMessage } from "../lib/contact";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Busca ilustrativa: dois concorrentes aparecem e a empresa do visitante, não. */
function SearchMock() {
  return (
    <div
      role="img"
      aria-label="Exemplo ilustrativo de uma pesquisa na internet: dois concorrentes aparecem nos resultados e a sua empresa não aparece."
      className="hero-in rounded-xl border border-line bg-navy p-5 shadow-[0_40px_70px_-40px_rgba(0,0,0,0.8)] sm:p-7"
      style={stagger(3)}
    >
      <div className="flex items-center gap-3 rounded-md bg-ink px-4 py-3 text-[0.9rem] text-muted-navy">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4" />
        </svg>
        melhor serviço perto de mim
      </div>

      <ul className="mt-6 space-y-6" aria-hidden="true">
        {[
          ["concorrente-um.com.br", "Concorrente Um | Serviço na sua cidade", "Peça seu orçamento online, veja o endereço e fale com a equipe agora."],
          ["concorrentedois.com.br", "Concorrente Dois | Atendimento e preços", "Conheça os serviços, as formas de pagamento e como agendar."]
        ].map(([url, title, snippet]) => (
          <li key={url}>
            <p className="text-[0.75rem] text-steel">{url}</p>
            <p className="mt-1 text-[1.05rem] font-semibold leading-snug text-cream">{title}</p>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-muted-navy">{snippet}</p>
          </li>
        ))}
        <li className="rounded-md border border-dashed border-steel/60 px-4 py-4">
          <p className="text-[1.05rem] font-semibold text-steel">Sua empresa</p>
          <p className="mt-1 text-[0.875rem] leading-relaxed text-muted-navy">Aqui não aparece nada. O cliente segue para o próximo resultado.</p>
        </li>
      </ul>

      <p className="mt-6 text-meta uppercase text-steel">Exemplo ilustrativo</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="bg-ink">
      <div className="mx-auto grid max-w-page gap-14 px-5 pb-28 pt-14 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-40 lg:pt-24">
        <div className="lg:col-span-7">
          <h1 className="hero-in text-display font-extrabold" style={stagger(0)}>
            Seu cliente pesquisa antes de comprar.
          </h1>
          <p className="hero-in mt-7 max-w-[36rem] text-lead text-muted-navy" style={stagger(1)}>
            Se ele não encontra a sua empresa, encontra a do concorrente. A Mobyze cria o site, a landing page, o aplicativo ou o
            sistema que dá ao seu negócio um lugar próprio na internet.
          </p>

          <div className="hero-in mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" style={stagger(2)}>
            <LinkButton href={channel.href(defaultMessage)} target="_blank" rel="noopener noreferrer" arrow>
              Pedir orçamento pelo {channel.label}
            </LinkButton>
            <LinkButton href="#servicos" variant="link">
              Ver o que a Mobyze cria
              <ArrowDown width={16} height={16} />
            </LinkButton>
          </div>
          <p className="hero-in mt-4 text-[0.875rem] text-muted-navy" style={stagger(2)}>
            {channel.label === "WhatsApp"
              ? "Você fala direto com a equipe, com a mensagem já pronta."
              : "Você fala direto com a equipe, por mensagem no Instagram."}
          </p>
        </div>

        <div className="lg:col-span-5 lg:translate-y-6">
          <SearchMock />
        </div>
      </div>
    </section>
  );
}
