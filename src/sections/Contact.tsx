import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { InstagramIcon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";
import { serviceLabel, type ServiceId } from "../data/services";
import { buildMessage, channel } from "../lib/contact";

type Choice = ServiceId | "indefinido";
const choices = Object.keys(serviceLabel) as Choice[];

type Props = { service: Choice; onServiceChange: (id: Choice) => void };

export function Contact({ service, onServiceChange }: Props) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    window.open(channel.href(buildMessage({ name, service, note })), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="on-cream bg-cream text-ink">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal as="h2" className="text-title font-extrabold">
            Conte o que o seu negócio precisa.
          </Reveal>
          <Reveal index={1} as="p" className="mt-6 max-w-[28rem] text-lead text-muted-cream">
            Uma mensagem curta, direto com a equipe da Mobyze.
          </Reveal>
          <Reveal index={2} className="mt-10">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-bold underline decoration-1 underline-offset-[6px]">
              <InstagramIcon />@{INSTAGRAM_HANDLE}
            </a>
          </Reveal>
        </div>

        <Reveal index={1} className="lg:col-span-7">
          <form onSubmit={submit} className="rounded-xl bg-ink p-6 text-cream sm:p-10 [color-scheme:dark] [--focus:var(--cream)]">
            <label className="block">
              <span className="text-[0.95rem] font-semibold">Seu nome</span>
              <input
                type="text"
                name="nome"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-navy px-4 py-3.5 text-cream placeholder:text-steel"
                placeholder="Como podemos te chamar"
              />
            </label>

            <fieldset className="mt-8">
              <legend className="text-[0.95rem] font-semibold">O que você precisa?</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {choices.map((c) => (
                  <label key={c} className="block cursor-pointer">
                    <input type="radio" name="servico" value={c} checked={service === c} onChange={() => onServiceChange(c)} className="peer sr-only" />
                    <span className="block rounded-md border border-line px-4 py-3.5 font-semibold text-muted-navy transition-colors hover:border-steel peer-checked:border-cream peer-checked:bg-navy peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-cream">
                      {serviceLabel[c]}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-8 block">
              <span className="text-[0.95rem] font-semibold">Quer adiantar alguma coisa? <span className="font-normal text-muted-navy">(opcional)</span></span>
              <textarea
                name="mensagem"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2 w-full resize-y rounded-md border border-line bg-navy px-4 py-3.5 text-cream placeholder:text-steel"
                placeholder="Ex.: tenho uma clínica e ainda não tenho site"
              />
            </label>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" arrow className="w-full shrink-0 sm:w-auto sm:whitespace-nowrap">
                Abrir conversa no {channel.label}
              </Button>
              <p className="text-[0.875rem] text-muted-navy">
                {channel.label === "WhatsApp" ? "Abre o WhatsApp com a mensagem pronta. Você revisa antes de enviar." : "Abre a conversa no Instagram da Mobyze."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
