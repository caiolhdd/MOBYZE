import { Reveal } from "../components/Reveal";
import { ArrowRight, ServiceIcon } from "../components/Icons";
import { services, type ServiceId } from "../data/services";

export function Services({ onPick }: { onPick: (id: ServiceId) => void }) {
  return (
    <section id="servicos" className="bg-navy">
      <div className="mx-auto grid max-w-page gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal as="h2" className="text-title font-extrabold">
              O que a Mobyze cria para o seu negócio.
            </Reveal>
            <Reveal index={1} as="p" className="mt-6 max-w-[26rem] text-muted-navy">
              Quatro frentes. Escolha uma para pedir orçamento ou conte a sua situação e indicamos o caminho.
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} index={Math.min(i, 2)} className="border-b border-line">
              <a
                href="#contato"
                onClick={() => onPick(s.id)}
                className="group grid grid-cols-[auto_1fr] items-start gap-5 py-8 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:py-10"
              >
                <ServiceIcon name={s.icon} width={30} height={30} className="mt-1 text-steel transition-colors group-hover:text-cream" />
                <div>
                  <h3 className="text-[1.5rem] font-bold leading-tight sm:text-[1.75rem]">{s.name}</h3>
                  <p className="mt-3 max-w-prose text-muted-navy">{s.description}</p>
                  <span className="sr-only">Pedir orçamento de {s.name}</span>
                </div>
                <ArrowRight width={22} height={22} className="mt-2 hidden text-steel sm:block transition-[transform,color] duration-150 group-hover:translate-x-1 group-hover:text-cream" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
