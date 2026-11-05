import { expect, test, type Page } from "@playwright/test";

/** Coleta os recursos JS/CSS pedidos pela página, para provar que um site não carrega o do outro. */
function recursos(page: Page) {
  const urls: string[] = [];
  page.on("request", (r) => ["script", "stylesheet", "font"].includes(r.resourceType()) && urls.push(r.url()));
  return urls;
}

test("/ abre o site da Mobyze sem carregar o CHIQ CELL", async ({ page }) => {
  const urls = recursos(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Seu cliente pesquisa antes de comprar.");
  await expect(page).toHaveTitle(/^Mobyze/);
  await page.waitForLoadState("networkidle");
  expect(urls.filter((u) => /manrope|chiqcell/i.test(u))).toEqual([]);
});

for (const caminho of ["/chiqcell", "/chiqcell/", "/chiqcell?linha=15"]) {
  test(`${caminho} abre o CHIQ CELL (inclusive acesso direto/recarregar) sem estilos da Mobyze`, async ({ page }) => {
    const urls = recursos(page);
    await page.goto(caminho);
    await expect(page.getByRole("heading", { name: "Escolha o seu próximo aparelho." })).toBeVisible();
    await expect(page).toHaveTitle(/^CHIQ CELL/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /CHIQ CELL/);
    await page.waitForLoadState("networkidle");
    expect(urls.filter((u) => /montserrat/i.test(u))).toEqual([]);
    // fonte do CHIQ CELL efetivamente aplicada => CSS certo, sem vazamento do tema da Mobyze
    expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toMatch(/Manrope/);
  });
}

test("prefixo parecido não é capturado pelo CHIQ CELL", async ({ page }) => {
  await page.goto("/chiqcellx");
  await expect(page).toHaveTitle(/^Mobyze/);
});
