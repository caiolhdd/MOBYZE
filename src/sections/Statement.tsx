import { Reveal } from "../components/Reveal";

function Globe() {
  return (
    <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="h-full w-full">
      <circle cx="120" cy="120" r="104" />
      <ellipse cx="120" cy="120" rx="42" ry="104" />
      <ellipse cx="120" cy="120" rx="82" ry="104" />
      <path d="M16 120h208" />
      <path d="M28 70c58 18 126 18 184 0M28 170c58-18 126-18 184 0" />
    </svg>
  );
}

export function Statement() {
  return (
    <section id="so-isso-nao-basta" className="on-cream relative overflow-hidden bg-cream text-ink">
      {/* Corte diagonal herdado do primeiro post do perfil. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-16 bg-ink [clip-path:polygon(0_0,100%_0,0_100%)] sm:h-28" />

      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/2 hidden aspect-square w-[34rem] -translate-y-1/2 text-navy/15 md:block lg:-right-24">
        <Globe />
      </div>

      <div className="relative mx-auto grid max-w-page gap-12 px-5 pb-28 pt-40 sm:px-8 sm:pt-56 lg:grid-cols-12 lg:pb-36">
        <Reveal as="h2" className="font-extrabold uppercase italic leading-[0.92] tracking-tight text-[clamp(2.9rem,9.4vw,8.25rem)] lg:col-span-12">
          Só isso <br className="hidden sm:block" />
          não basta.
        </Reveal>

        <Reveal index={1} className="space-y-5 text-lead text-muted-cream lg:col-span-5 lg:col-start-1">
          <p>
            Perfil em rede social ajuda a ser visto. Mas quem já quer comprar procura um endereço seu: o que você faz, onde fica,
            como pedir.
          </p>
          <p className="font-semibold text-ink">Sem esse endereço, a pessoa chega no concorrente. É ele que a Mobyze cria.</p>
        </Reveal>
      </div>
    </section>
  );
}
