import { useCallback, useEffect, useState } from "react";
import { ORDENACAO_PADRAO, TODOS, isOrdenacao, type Filtro } from "./regras";

const PARAMS = { grupo: "linha", busca: "q", ordem: "ordem" } as const;

function lerDaUrl(gruposValidos: readonly string[]): Filtro {
  const sp = new URLSearchParams(window.location.search);
  const grupo = sp.get(PARAMS.grupo);
  const ordem = sp.get(PARAMS.ordem);
  return {
    grupo: grupo && gruposValidos.includes(grupo) ? grupo : TODOS,
    busca: sp.get(PARAMS.busca) ?? "",
    ordem: isOrdenacao(ordem) ? ordem : ORDENACAO_PADRAO,
  };
}

function escreverNaUrl(f: Filtro, modo: "push" | "replace") {
  const url = new URL(window.location.href);
  const set = (k: string, v: string, padrao: string) => (v && v !== padrao ? url.searchParams.set(k, v) : url.searchParams.delete(k));
  set(PARAMS.grupo, f.grupo, TODOS);
  set(PARAMS.busca, f.busca.trim(), "");
  set(PARAMS.ordem, f.ordem, ORDENACAO_PADRAO);
  if (url.href === window.location.href) return;
  window.history[modo === "push" ? "pushState" : "replaceState"](window.history.state, "", url);
}

/**
 * Estado do filtro espelhado na URL (?linha=15&q=pro&ordem=menor-preco):
 * link compartilhável e botão "voltar" desfaz troca de linha/ordem.
 * Digitação na busca usa replaceState para não poluir o histórico.
 */
export function useFiltroNaUrl(gruposValidos: readonly string[]) {
  const [filtro, setFiltro] = useState<Filtro>(() => lerDaUrl(gruposValidos));

  useEffect(() => {
    const aoNavegar = () => setFiltro(lerDaUrl(gruposValidos));
    window.addEventListener("popstate", aoNavegar);
    return () => window.removeEventListener("popstate", aoNavegar);
  }, [gruposValidos]);

  const atualizar = useCallback(
    (parcial: Partial<Filtro>) => {
      const novo = { ...filtro, ...parcial };
      escreverNaUrl(novo, "busca" in parcial ? "replace" : "push");
      setFiltro(novo);
    },
    [filtro],
  );

  return [filtro, atualizar] as const;
}
