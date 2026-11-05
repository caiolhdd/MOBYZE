export type ServiceId = "site" | "landing" | "app" | "sistema";
export type IconName = "browser" | "target" | "phone" | "layers";

export type Service = {
  id: ServiceId;
  name: string;
  description: string;
  icon: IconName;
};

/** Os quatro serviços do perfil @somosmobyze, na mesma ordem do post. */
export const services: Service[] = [
  {
    id: "site",
    name: "Sites institucionais",
    description: "A sua empresa, o que ela faz e como falar com ela, numa página própria que o cliente entende em segundos.",
    icon: "browser"
  },
  {
    id: "landing",
    name: "Landing pages",
    description: "Uma página, um objetivo: levar o visitante a pedir orçamento, agendar ou comprar.",
    icon: "target"
  },
  {
    id: "app",
    name: "Aplicativos",
    description: "O seu serviço no celular do cliente, desenhado em torno de como a sua operação funciona.",
    icon: "phone"
  },
  {
    id: "sistema",
    name: "Sistemas sob medida",
    description: "Para quando planilha e conversa solta já não dão conta da rotina da empresa.",
    icon: "layers"
  }
];

export const serviceLabel: Record<ServiceId | "indefinido", string> = {
  site: "Site institucional",
  landing: "Landing page",
  app: "Aplicativo",
  sistema: "Sistema sob medida",
  indefinido: "Ainda não sei"
};
