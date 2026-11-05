export type Product = {
  name: string;
  group: string;
  description: string;
  price: string;
  /** Caminho da foto em /public. Sem foto, o card mostra um placeholder explícito. */
  image?: string;
  features: string[];
};

export const products: Product[] = [
  {
    name: "iPhone 15 Pro",
    group: "Pro",
    description: "Titânio. Potência para ir além.",
    price: "R$ 4.899",
    image: "/img/img-iphone.png",
    features: ["Chip A17 Pro", "Câmera principal de 48 MP", "Tela Super Retina XDR"]
  },
  {
    name: "iPhone 14",
    group: "iPhone",
    description: "Um clássico que continua incrível.",
    price: "R$ 3.299",
    features: ["Chip A15 Bionic", "Câmera dupla avançada", "Bateria para o dia todo"]
  },
  {
    name: "iPhone 13",
    group: "iPhone",
    description: "Desempenho que cabe na sua rotina.",
    price: "R$ 2.899",
    features: ["Chip A15 Bionic", "Modo Cinema", "Face ID"]
  },
  {
    name: "Xiaomi 14",
    group: "Xiaomi",
    description: "Velocidade e câmera para criar.",
    price: "R$ 3.199",
    features: ["Câmera Leica", "HyperOS", "Carregamento rápido"]
  }
];

export const filters = ["Todos", "Pro", "iPhone", "Xiaomi"] as const;
