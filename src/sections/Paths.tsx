import { useState } from "react";
import { LinkButton } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { paths } from "../data/paths";
import type { ServiceId } from "../data/services";

export function Paths({ onPick }: { onPick: (id: ServiceId | "indefinido") => void }) {
  const [selected, setSelected] = useState(paths[0].id);
  const current = paths.find((p) => p.id === selected) ?? paths[0];

  return (
    <section id="caminho" className="bg-ink">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal as="h2" className="text-title font-extrabold">
            Diga a sua situação. Indicamos o caminho.
          </Reveal>

          <Reveal index={1} as="fieldset" className="mt-10 space-y-3">
            <legend className="sr-only">Qual é a sua situação?</legend>
            {paths.map((p) => (
              <label key={p.id} className="block cursor-pointer">
                <input
                  type="radio"
                  name="situacao"
                  value={p.id}
                  checked={selected === p.id}
                  onChange={() => setSelected(p.id)}
                  className="peer sr-only"
                />
                <span className="block rounded-md border border-line px-5 py-4 font-semibold text-muted-navy transition-colors hover:border-steel peer-checked:border-cream peer-checked:bg-navy peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-cream">
                  {p.situation}
                </span>
              </label>
            ))}
          </Reveal>
        </div>

        <Reveal index={2} className="lg:col-span-7">
          <div aria-live="polite" className="rounded-xl bg-navy p-7 sm:p-11">
            <h3 className="text-title font-extrabold">{current.verdict}</h3>
            <p className="mt-5 max-w-prose text-lead text-muted-navy">{current.why}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <LinkButton href="#contato" arrow onClick={() => onPick(current.service)}>
                Pedir orçamento de {current.verdict.toLowerCase()}
              </LinkButton>
              <LinkButton href="#contato" variant="link" onClick={() => onPick("indefinido")}>
                Ainda em dúvida? Fale com a equipe
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
