import { useCallback, useEffect, useState } from "react";
import { MAX_COMPARACAO } from "./regras";

const PARAM = "comparar";

function lerDaUrl(idsValidos: ReadonlySet<string>): string[] {
  const bruto = new URLSearchParams(window.location.search).get(PARAM) ?? "";
  return [...new Set(bruto.split(","))].filter((id) => idsValidos.has(id)).slice(0, MAX_COMPARACAO);
}

function escreverNaUrl(ids: string[]) {
  const url = new URL(window.location.href);
  if (ids.length) url.searchParams.set(PARAM, ids.join(","));
  else url.searchParams.delete(PARAM);
  // Seleção não é navegação: replaceState para o "voltar" continuar desfazendo filtros, não cliques de comparação.
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
}

/** Seleção de até MAX_COMPARACAO produtos, persistida na URL para o link da comparação ser compartilhável. */
export function useComparacaoNaUrl(idsValidos: ReadonlySet<string>) {
  const [ids, setIds] = useState<string[]>(() => lerDaUrl(idsValidos));

  useEffect(() => {
    const aoNavegar = () => setIds(lerDaUrl(idsValidos));
    window.addEventListener("popstate", aoNavegar);
    return () => window.removeEventListener("popstate", aoNavegar);
  }, [idsValidos]);

  const definir = useCallback((novos: string[]) => {
    escreverNaUrl(novos);
    setIds(novos);
  }, []);

  const alternar = useCallback(
    (id: string) => {
      if (ids.includes(id)) definir(ids.filter((x) => x !== id));
      else if (ids.length < MAX_COMPARACAO) definir([...ids, id]);
    },
    [ids, definir],
  );

  const limpar = useCallback(() => definir([]), [definir]);

  return { ids, alternar, limpar, cheio: ids.length >= MAX_COMPARACAO };
}
