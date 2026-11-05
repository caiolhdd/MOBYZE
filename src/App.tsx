import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Check, CreditCard, Menu, MessageCircle, ShieldCheck, Truck, X } from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "./components/ui/dialog";
import { STORE, whatsappLink } from "./config";
import { filters, products, type Product } from "./data/products";
import { cn } from "./lib/utils";

const wrap = "mx-auto w-[min(1180px,calc(100%-2rem))]";
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";
const whatsapp = whatsappLink("Olá! Quero encontrar meu próximo aparelho.");
const navItems = [
  ["Início", "inicio"],
  ["Catálogo", "produtos"],
  ["Por que a Chiq", "sobre"],
  ["Contato", "contato"]
] as const;
const differentials = [
  ["Garantia clara", "Condições explicadas antes da compra."],
  ["Curadoria", "Modelos revisados e selecionados."],
  ["Entrega", "Consulte disponibilidade na sua região."],
  ["Atendimento humano", "Fale direto com um vendedor."]
] as const;

function ProductMedia({ product }: { product: Product }) {
  return (
    <div className="mb-5 grid h-52 place-items-center overflow-hidden rounded-control bg-slate-900">
      {product.image ? (
        <img src={product.image} alt={product.name} width={876} height={1608} loading="lazy" className="h-full w-auto max-w-full object-contain" />
      ) : (
        <p className="m-3 grid h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] place-items-center rounded-control border border-dashed border-white/20 px-3 text-center text-sm text-slate-400">
          [foto do {product.name}]
        </p>
      )}
    </div>
  );
}

export function App() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = useMemo(() => (filter === "Todos" ? products : products.filter((p) => p.group === filter)), [filter]);

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink">
        <div className={cn(wrap, "flex min-h-20 items-center justify-between gap-6")}>
          <a href="#inicio" className={cn("rounded-control text-xl font-black tracking-tight", focusRing)}>
            CHIQ<span className="text-cyan-300">CELL</span>
            <small className="ml-2 hidden text-xs tracking-widest text-slate-400 sm:inline">APPLE &amp; XIAOMI</small>
          </a>
          <button
            className={cn("rounded-control border border-white/10 p-2 md:hidden", focusRing)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav
            id="menu-principal"
            aria-label="Navegação principal"
            className={cn(
              menuOpen ? "flex" : "hidden",
              "absolute left-0 right-0 top-20 flex-col gap-4 border-b border-white/10 bg-ink-raised p-5 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0"
            )}
          >
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className={cn("rounded-control text-sm text-slate-300 transition-colors hover:text-cyan-200", focusRing)}>
                {label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={whatsapp}><MessageCircle size={15} />Falar com vendedor</a>
          </Button>
        </div>
      </header>

      <main>
        <section id="inicio" className={cn(wrap, "grid items-center gap-8 py-12 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:py-28")}>
          <div>
            <h1 className="max-w-3xl text-balance text-5xl font-black leading-[.92] tracking-[-.05em] sm:text-7xl lg:text-8xl">
              Seu próximo iPhone está aqui.
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Modelos selecionados, condições especiais e atendimento próximo para você comprar com confiança.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><a href="#produtos">Ver catálogo <ArrowRight size={17} /></a></Button>
              <Button asChild variant="outline"><a href={whatsapp}>Tirar dúvidas <MessageCircle size={17} /></a></Button>
            </div>
            <ul className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6 text-sm">
              {[
                [ShieldCheck, "Garantia", "Consulte condições"],
                [CreditCard, "Até 21x", "No cartão"],
                [Truck, "Entrega", "Consulte sua região"]
              ].map(([Icon, title, text]) => {
                const PerkIcon = Icon as typeof ShieldCheck;
                return (
                  <li key={title as string}>
                    <PerkIcon className="mb-2 text-cyan-300" size={20} />
                    <b>{title as string}</b>
                    <small className="mt-1 block text-slate-400">{text as string}</small>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="grid min-h-[300px] place-items-center sm:min-h-[440px]">
            <img
              src="/img/img-iphone.png"
              alt="iPhone em destaque"
              width={876}
              height={1608}
              fetchPriority="high"
              className="max-h-[300px] w-auto max-w-[88%] object-contain drop-shadow-2xl sm:max-h-[430px]"
            />
          </div>
        </section>

        <section id="produtos" className={cn(wrap, "py-20")}>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl text-balance text-3xl font-black tracking-tight sm:text-5xl">Escolha o seu próximo aparelho.</h2>
            <p className="max-w-md text-pretty text-slate-400">Compare os modelos e fale direto com nosso time para confirmar estoque, cor e condições.</p>
          </div>
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por linha">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={cn(
                  "rounded-control border px-4 py-2 text-sm font-bold transition-colors",
                  focusRing,
                  filter === item ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/15 text-slate-300 hover:border-cyan-300/70 hover:text-cyan-200"
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <Card key={product.name} className="p-4">
                <ProductMedia product={product} />
                <div className="flex items-center justify-between">
                  <Badge>{product.group}</Badge>
                  <span className="text-lg font-black text-cyan-200">{product.price}</span>
                </div>
                <h3 className="mt-3 text-xl font-extrabold">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{product.description}</p>
                <ul className="my-4 space-y-2 text-sm text-slate-300">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cyan-300" />{f}</li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline" onClick={() => setSelected(product)}>Ver detalhes</Button>
              </Card>
            ))}
          </div>
        </section>

        <section id="sobre" className="border-y border-white/10 bg-ink-raised">
          <div className={cn(wrap, "grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center")}>
            <div>
              <h2 className="text-balance text-3xl font-black tracking-tight sm:text-5xl">Tecnologia boa começa com atendimento bom.</h2>
              <p className="mt-5 max-w-lg text-pretty leading-8 text-slate-300">
                A Chiq Cell ajuda você a escolher o aparelho ideal: explicamos as diferenças, mostramos as condições e acompanhamos você até a entrega.
              </p>
              <Button asChild variant="outline" className="mt-7"><a href={whatsapp}>Conversar agora <ArrowRight size={17} /></a></Button>
            </div>
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {differentials.map(([title, text]) => (
                <div key={title} className="border-t border-white/15 pt-4">
                  <dt className="font-extrabold">{title}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contato" className={cn(wrap, "flex flex-col justify-between gap-8 py-16 md:flex-row md:items-center")}>
          <div>
            <h2 className="text-balance text-3xl font-black sm:text-4xl">Vamos encontrar o seu?</h2>
            <p className="mt-3 text-slate-400">{STORE.address} · {STORE.hours}</p>
          </div>
          <Button asChild className="w-full md:w-auto"><a href={whatsapp}>Chamar no WhatsApp <MessageCircle size={17} /></a></Button>
        </section>
      </main>

      <footer className="border-t border-white/10 py-7 text-center text-sm text-slate-400">© {new Date().getFullYear()} CHIQ CELL · Apple &amp; Xiaomi</footer>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogTitle className="text-2xl font-black">{selected.name}</DialogTitle>
              <p className="mt-2 text-slate-400">{selected.description}</p>
              <div className="my-6 rounded-control bg-white/[.05] p-5">
                <div className="mb-3 text-2xl font-black text-cyan-200">{selected.price}</div>
                {selected.features.map((f) => (
                  <div key={f} className="flex gap-2 border-t border-white/10 py-3 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-cyan-300" />{f}</div>
                ))}
              </div>
              <Button asChild className="w-full"><a href={whatsapp}>Tenho interesse <MessageCircle size={17} /></a></Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
