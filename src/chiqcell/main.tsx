import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const META = {
  title: "CHIQ CELL | Seu próximo iPhone está aqui",
  description: "CHIQ CELL — iPhones e Xiaomi com atendimento personalizado. Compare os modelos e solicite seu orçamento pelo WhatsApp.",
  themeColor: "#030711",
};

/** O index.html é compartilhado com a Mobyze; título e metas próprios são aplicados ao montar. */
function aplicarMeta() {
  document.title = META.title;
  const set = (seletor: string, valor: string) => document.querySelector<HTMLMetaElement>(seletor)?.setAttribute("content", valor);
  set('meta[name="description"]', META.description);
  set('meta[name="theme-color"]', META.themeColor);
  set('meta[property="og:title"]', META.title);
  set('meta[property="og:description"]', META.description);
}

/** Boot do CHIQ CELL (rota /chiqcell). Carregado sob demanda por src/main.tsx. */
export function montar(raiz: HTMLElement) {
  aplicarMeta();
  createRoot(raiz).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
