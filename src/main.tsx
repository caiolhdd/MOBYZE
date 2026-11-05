import { ehRotaChiqcell } from "./rotas";

/**
 * Roteador de entrada: cada site é um chunk separado com o próprio CSS (inclusive o reset do Tailwind),
 * então os estilos de um nunca vazam para o outro e quem abre a Mobyze não baixa nada do CHIQ CELL.
 * Roteamento no cliente porque a hospedagem (Lovable) faz fallback de SPA para o index.html.
 */
const raiz = document.getElementById("root")!;
const app = ehRotaChiqcell(window.location.pathname) ? import("./chiqcell/main") : import("./mobyze");

app
  .then(({ montar }) => montar(raiz))
  .catch((erro: unknown) => {
    // Ex.: rede instável ou deploy novo invalidando o hash do chunk. Sem isso a tela fica em branco.
    console.error("[boot] falha ao carregar a aplicação", erro);
    raiz.innerHTML =
      '<p style="font:16px/1.5 system-ui,sans-serif;padding:2rem;text-align:center">Não foi possível carregar a página. <a href="" style="color:inherit">Tentar novamente</a></p>';
  });
