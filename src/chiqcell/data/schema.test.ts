import { describe, expect, it } from "vitest";
import base from "./catalogo.json";
import { catalogoSchema, produtoSchema, vendedorSchema } from "./schema";

describe("catalogo.json publicado", () => {
  it("é válido pelo schema", () => {
    const r = catalogoSchema.safeParse(base);
    expect(r.success, r.success ? "" : JSON.stringify(r.error.flatten(), null, 2)).toBe(true);
  });

  it("não tem nomes de produto duplicados (geram ids instáveis)", () => {
    const nomes = base.produtos.map((p) => p.nome);
    expect(new Set(nomes).size).toBe(nomes.length);
  });
});

describe("produtoSchema", () => {
  it("normaliza strings vazias para ausente e itens para []", () => {
    const p = produtoSchema.parse({ grupo: "15", nome: "iPhone 15", preco: "", cor: "", foto: "  " });
    expect(p.preco).toBeUndefined();
    expect(p.cor).toBeUndefined();
    expect(p.foto).toBeUndefined();
    expect(p.itens).toEqual([]);
  });

  it.each([
    [{ condicao: "usado" }],
    [{ bateria: 101 }],
    [{ bateria: 88.5 }],
    [{ cor: "green" }],
    [{ nome: "" }],
  ])("rejeita %j", (extra) => {
    expect(produtoSchema.safeParse({ grupo: "15", nome: "iPhone 15", ...extra }).success).toBe(false);
  });
});

describe("vendedorSchema", () => {
  it.each(["5521999990001", "552199990001"])("aceita %s", (telefone) => {
    expect(vendedorSchema.safeParse({ nome: "Ana", telefone }).success).toBe(true);
  });
  it.each(["(21) 99999-0001", "21999990001", ""])("rejeita %s", (telefone) => {
    expect(vendedorSchema.safeParse({ nome: "Ana", telefone }).success).toBe(false);
  });
});
