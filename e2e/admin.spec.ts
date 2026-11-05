import { expect, test } from "@playwright/test";
import catalogo from "../src/chiqcell/data/catalogo.json" with { type: "json" };

test("painel do CHIQ CELL carrega o catálogo publicado", async ({ page }) => {
  const erros: string[] = [];
  page.on("pageerror", (e) => erros.push(e.message));
  await page.goto("/tools/chiqcell-admin/");
  await expect(page.locator("#lista-produtos .item")).toHaveCount(catalogo.produtos.length);
  expect(erros).toEqual([]);
});
