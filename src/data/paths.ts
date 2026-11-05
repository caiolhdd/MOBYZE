import type { ServiceId } from "./services";

export type Path = {
  id: string;
  situation: string;
  service: ServiceId;
  verdict: string;
  why: string;
};

/** "Por onde começar": o visitante se classifica pela situação, não pelo nome do produto. */
export const paths: Path[] = [
  {
    id: "achar",
    situation: "Quase ninguém me acha na internet",
    service: "site",
    verdict: "Site institucional",
    why: "Você ganha um endereço próprio onde o cliente confirma quem você é, o que faz e como falar com você, antes de decidir."
  },
  {
    id: "oferta",
    situation: "Vou divulgar uma oferta ou campanha",
    service: "landing",
    verdict: "Landing page",
    why: "Quem clica no anúncio cai numa página feita para uma ação só, sem menu e sem desvio até o pedido de orçamento."
  },
  {
    id: "atender",
    situation: "Meus clientes precisam pedir ou agendar algo",
    service: "app",
    verdict: "Aplicativo",
    why: "O cliente resolve pelo celular, no seu aplicativo, o que hoje depende de mensagem e de alguém respondendo."
  },
  {
    id: "rotina",
    situation: "Minha rotina vive em planilhas e mensagens",
    service: "sistema",
    verdict: "Sistema sob medida",
    why: "Cadastros e processos passam a morar num lugar só, montado do jeito que a sua empresa trabalha."
  }
];
