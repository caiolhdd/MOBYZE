import { describe, expect, it } from "vitest";
import type { Produto } from "../../data/schema";
import { especificacoes, filtrarProdutos, tabelaComparacao, linkWhatsApp, ordenarGrupos, precoNumerico, rotuloGrupo, TODOS } from "./regras";

const p = (o: Partial<Produto> & Pick<Produto, "nome">): Produto => ({ id: o.nome, grupo: "15", itens: [], ...o });

describe("rotuloGrupo", () => {
  it.each([
    [TODOS, "Todos"],
    ["15", "iPhone 15"],
    ["SE", "iPhone SE"],
    ["Xiaomi", "Xiaomi"],
  ])("%s -> %s", (g, esperado) => expect(rotuloGrupo(g)).toBe(esperado));
});

describe("ordenarGrupos", () => {
  it("ordena linhas numéricas como número, depois SE, depois marcas, sem duplicar", () => {
    expect(ordenarGrupos(["Xiaomi", "11", "SE", "9", "17", "11", "Motorola"])).toEqual(["9", "11", "17", "SE", "Motorola", "Xiaomi"]);
  });
});

describe("precoNumerico", () => {
  it.each([
    ["R$ 2.999", 2999],
    ["R$ 2.999,90", 2999.9],
    ["R$ 7.499,00", 7499],
    [undefined, null],
    ["Consulte", null],
    ["R$ 0", null],
  ])("%s -> %s", (entrada, esperado) => expect(precoNumerico(entrada)).toBe(esperado));
});

describe("filtrarProdutos", () => {
  const lista = [
    p({ nome: "iPhone 15 Pro Max", grupo: "15", lanc: "2023", chip: "A17 Pro", preco: "R$ 7.000" }),
    p({ nome: "iPhone 11", grupo: "11", lanc: "2019", preco: "R$ 1.500" }),
    p({ nome: "Xiaomi / Redmi", grupo: "Xiaomi" }),
    p({ nome: "iPhone 17", grupo: "17", lanc: "2025", itens: ["Câmera frontal de 18 MP"] }),
  ];
  const nomes = (r: Produto[]) => r.map((x) => x.nome);
  const base = { grupo: TODOS, busca: "", ordem: "recentes" as const };

  it("filtra por grupo", () => {
    expect(nomes(filtrarProdutos(lista, { ...base, grupo: "11" }))).toEqual(["iPhone 11"]);
  });

  it("busca por todos os termos, sem acento e sem diferenciar maiúsculas", () => {
    expect(nomes(filtrarProdutos(lista, { ...base, busca: "PRO a17" }))).toEqual(["iPhone 15 Pro Max"]);
    expect(nomes(filtrarProdutos(lista, { ...base, busca: "camera frontal" }))).toEqual(["iPhone 17"]);
    expect(filtrarProdutos(lista, { ...base, busca: "pro 11" })).toEqual([]);
  });

  it("recentes: ano desc; sem ano vai para o fim", () => {
    expect(nomes(filtrarProdutos(lista, base))).toEqual(["iPhone 17", "iPhone 15 Pro Max", "iPhone 11", "Xiaomi / Redmi"]);
  });

  it("antigos: ano asc; sem ano vai para o fim", () => {
    expect(nomes(filtrarProdutos(lista, { ...base, ordem: "antigos" }))).toEqual(["iPhone 11", "iPhone 15 Pro Max", "iPhone 17", "Xiaomi / Redmi"]);
  });

  it("preço: sem preço sempre no fim, empate preserva a ordem do cadastro", () => {
    expect(nomes(filtrarProdutos(lista, { ...base, ordem: "menor-preco" }))).toEqual(["iPhone 11", "iPhone 15 Pro Max", "Xiaomi / Redmi", "iPhone 17"]);
    expect(nomes(filtrarProdutos(lista, { ...base, ordem: "maior-preco" }))).toEqual(["iPhone 15 Pro Max", "iPhone 11", "Xiaomi / Redmi", "iPhone 17"]);
  });

  it("não muta a lista original", () => {
    const copia = [...lista];
    filtrarProdutos(lista, { ...base, ordem: "antigos" });
    expect(lista).toEqual(copia);
  });
});

describe("linkWhatsApp", () => {
  const v = { nome: "Ana", telefone: "5521999990001" };
  it("inclui o produto na mensagem, codificada", () => {
    const url = new URL(linkWhatsApp(v, p({ nome: "iPhone 15 & Co" })));
    expect(url.origin + url.pathname).toBe("https://wa.me/5521999990001");
    expect(url.searchParams.get("text")).toBe("Olá, Ana! Tenho interesse no iPhone 15 & Co e gostaria de solicitar um orçamento.");
  });
  it("mensagem genérica sem produto", () => {
    expect(new URL(linkWhatsApp(v)).searchParams.get("text")).toContain("Acessei o site da CHIQ CELL");
  });
});

describe("especificacoes", () => {
  it("omite campos vazios e formata bateria", () => {
    expect(especificacoes(p({ nome: "X", chip: "A15", bateria: 88 }))).toEqual([
      ["Chip", "A15"],
      ["Saúde da bateria", "88%"],
    ]);
  });
});

describe("tabelaComparacao", () => {
  const a = p({ nome: "A", chip: "A15", lanc: "2021", preco: "R$ 2.000", itens: ["X"] });
  const b = p({ nome: "B", chip: "A16", lanc: "2021", disponivel: false });
  const linha = (rotulo: string) => tabelaComparacao([a, b]).find((l) => l.rotulo === rotulo);

  it("marca linhas iguais e diferentes", () => {
    expect(linha("Lançamento")).toEqual({ rotulo: "Lançamento", valores: ["2021", "2021"], iguais: true });
    expect(linha("Chip")?.iguais).toBe(false);
  });

  it("preço ausente vira 'Sob consulta' e esgotado é exibido", () => {
    expect(linha("Preço")?.valores).toEqual(["R$ 2.000", "Sob consulta"]);
    expect(linha("Disponibilidade")?.valores).toEqual(["Disponível", "Esgotado"]);
  });

  it("omite linhas sem nenhum valor e mantém posição de valores ausentes", () => {
    expect(linha("Tela")).toBeUndefined();
    expect(linha("Destaques")?.valores).toEqual(["X", undefined]);
  });
});
