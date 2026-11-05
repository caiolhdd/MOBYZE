import { useState } from "react";
import type { ServiceId } from "./data/services";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Paths } from "./sections/Paths";
import { Services } from "./sections/Services";
import { Statement } from "./sections/Statement";

export default function App() {
  const [service, setService] = useState<ServiceId | "indefinido">("indefinido");

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:font-bold focus:text-ink">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Statement />
        <Services onPick={setService} />
        <Paths onPick={setService} />
        <Contact service={service} onServiceChange={setService} />
      </main>
      <Footer />
    </>
  );
}
