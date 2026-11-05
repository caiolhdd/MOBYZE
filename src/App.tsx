import { useState } from "react";
import { ArrowRight, Clock, MapPin, Menu, MessageCircle, ShieldCheck, Sparkles, Truck, X } from "lucide-react";
import { catalogo } from "./data/catalogo";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Catalogo } from "./features/catalogo/Catalogo";
import { linkWhatsApp } from "./features/catalogo/regras";

const NAV = [
  ["Início", "inicio"],
  ["Catálogo", "produtos"],
  ["Por que a Chiq", "sobre"],
  ["Vendedores", "vendedores"],
  ["Contato", "contato"],
] as const;

const BENEFICIOS = [
  [ShieldCheck, "Garantia", "Consulte condições"],
  [Sparkles, "Até 21x", "No cartão"],
  [Truck, "Entrega", "Consulte sua região"],
] as const;

const PROMESSAS = [
  [ShieldCheck, "Garantia clara", "Condições explicadas antes da compra."],
  [Sparkles, "Curadoria", "Modelos revisados e selecionados."],
  [Truck, "Entrega", "Consulte disponibilidade na sua região."],
  [MessageCircle, "Atendimento humano", "Fale direto com um vendedor."],
] as const;

const container = "mx-auto w-[min(1180px,calc(100%-2rem))]";

export function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { loja, vendedores, produtos } = catalogo;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#030711] text-white">
      <a href="#produtos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cyan-300 focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950">
        Pular para o catálogo
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030711]/80 backdrop-blur-xl">
        <div className={`${container} flex min-h-20 items-center justify-between gap-6`}>
          <a href="#inicio" className="text-xl font-black tracking-tight">
            CHIQ<span className="text-cyan-300">CELL</span>
            <small className="ml-2 hidden text-[9px] tracking-[.25em] text-slate-400 sm:inline">APPLE & XIAOMI</small>
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 md:hidden"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
          >
            {menuAberto ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
          <nav
            id="menu-principal"
            aria-label="Navegação principal"
            className={`${menuAberto ? "flex" : "hidden"} absolute left-0 right-0 top-20 flex-col gap-1 border-b border-white/10 bg-[#050b16] p-3 md:static md:flex md:flex-row md:gap-6 md:border-0 md:bg-transparent md:p-0`}
          >
            {NAV.map(([rotulo, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuAberto(false)} className="rounded-lg px-3 py-3 text-sm text-slate-300 transition hover:text-cyan-200 md:p-0">
                {rotulo}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#vendedores">
              <MessageCircle size={15} aria-hidden />
              Falar com vendedor
            </a>
          </Button>
        </div>
      </header>

      <main>
        <section id="inicio" className={`hero-grid ${container} grid items-center gap-8 py-12 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:py-28`}>
          <div>
            <Badge>Seu iPhone, do seu jeito</Badge>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.92] tracking-[-.07em] sm:text-7xl lg:text-8xl">
              Seu próximo
              <br />
              <span className="text-gradient">iPhone está aqui.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">Modelos selecionados, condições especiais e atendimento próximo para você comprar com confiança.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#produtos">
                  Ver catálogo <ArrowRight size={17} aria-hidden />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#vendedores">
                  Tirar dúvidas <MessageCircle size={17} aria-hidden />
                </a>
              </Button>
            </div>
            <ul className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6 text-sm">
              {BENEFICIOS.map(([Icone, titulo, texto]) => (
                <li key={titulo}>
                  <Icone className="mb-2 text-cyan-300" size={20} aria-hidden />
                  <b>{titulo}</b>
                  <small className="mt-1 block text-slate-400">{texto}</small>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-art">
            <div className="hero-orbit" aria-hidden />
            <img src="/img/img-iphone.png" alt="iPhone em destaque" />
            <div className="hero-note" aria-hidden>
              Apple
              <br />
              <span>é aqui!</span>
            </div>
          </div>
        </section>

        <Catalogo produtos={produtos} vendedores={vendedores} />

        <section id="sobre" className="border-y border-white/10 bg-gradient-to-br from-[#071524] to-[#030711]">
          <div className={`${container} grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center`}>
            <div>
              <Badge>Uma compra mais tranquila</Badge>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Tecnologia boa começa com atendimento bom.</h2>
              <p className="mt-5 max-w-lg leading-8 text-slate-300">A Chiq Cell ajuda você a escolher o aparelho ideal sem complicação: explicamos as diferenças, mostramos as condições e acompanhamos você até a entrega.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PROMESSAS.map(([Icone, titulo, texto]) => (
                <li key={titulo}>
                  <Card className="h-full p-5">
                    <Icone className="mb-8 text-cyan-300" size={24} aria-hidden />
                    <h3 className="font-extrabold">{titulo}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{texto}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="vendedores" aria-labelledby="vendedores-titulo" className={`${container} py-16 sm:py-20`}>
          <Badge>Atendimento personalizado</Badge>
          <h2 id="vendedores-titulo" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Fale com nossos vendedores
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {vendedores.map((v) => (
              <li key={v.telefone}>
                <Card className="flex h-full flex-col items-center p-5 text-center">
                  <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 to-blue-700 text-2xl font-black">
                    {v.foto ? <img src={v.foto} alt="" className="h-full w-full object-cover" /> : <span aria-hidden>{v.nome.charAt(0).toUpperCase()}</span>}
                  </div>
                  <h3 className="mt-3 font-extrabold">{v.nome}</h3>
                  <p className="text-xs text-slate-400">Equipe comercial</p>
                  <Button asChild size="sm" className="mt-4 min-h-11 w-full">
                    <a href={linkWhatsApp(v)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={15} aria-hidden /> WhatsApp
                      <span className="sr-only"> de {v.nome} (abre em nova aba)</span>
                    </a>
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section id="contato" className={`${container} flex flex-col justify-between gap-8 border-t border-white/10 py-16 md:flex-row md:items-center`}>
          <div>
            <Badge>Visite ou fale com a gente</Badge>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Vamos encontrar o seu?</h2>
            <address className="mt-4 space-y-2 not-italic text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin size={18} aria-hidden className="mt-0.5 shrink-0 text-cyan-300" />
                {loja.endereco}
              </p>
              <p className="flex items-start gap-2">
                <Clock size={18} aria-hidden className="mt-0.5 shrink-0 text-cyan-300" />
                {loja.horario}
              </p>
            </address>
          </div>
          <Button asChild className="w-full md:w-auto">
            <a href="#vendedores">
              Escolher um vendedor <ArrowRight size={17} aria-hidden />
            </a>
          </Button>
        </section>
      </main>

      <footer className="border-t border-white/10 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CHIQ CELL · Apple & Xiaomi
      </footer>
    </div>
  );
}
