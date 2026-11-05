import { expect, test as base, type Page } from "@playwright/test";
import catalogo from "../src/data/catalogo.json" with { type: "json" };

const TOTAL = catalogo.produtos.length;
const cards = (page: Page) => page.locator("#produtos ul.grid > li");
const chip = (page: Page, nome: string) => page.getByRole("group", { name: "Filtrar por linha" }).getByRole("button", { name: nome, exact: true });

/** Fixture automática: qualquer erro de JS ou console.error durante o teste o reprova. */
const test = base.extend<{ semErrosNoConsole: void }>({
  semErrosNoConsole: [
    async ({ page }, use) => {
      const erros: string[] = [];
      page.on("pageerror", (e) => erros.push(e.message));
      page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
      await use();
      expect(erros, "erros no console").toEqual([]);
    },
    { auto: true },
  ],
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(cards(page)).toHaveCount(TOTAL);
});

test("sem rolagem horizontal", async ({ page }) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
});

test.describe("filtros", () => {
  test("filtro por linha atualiza URL, aria-pressed e o botão voltar desfaz", async ({ page }) => {
    await chip(page, "iPhone 15").click();
    await expect(cards(page)).toHaveCount(4);
    await expect(chip(page, "iPhone 15")).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/\?linha=15$/);
    await expect(page.getByRole("status").filter({ hasText: "encontrado" })).toHaveText("4 aparelhos encontrados");

    await page.goBack();
    await expect(cards(page)).toHaveCount(TOTAL);
    await expect(chip(page, "Todos")).toHaveAttribute("aria-pressed", "true");
  });

  test("busca + estado vazio + limpar filtros", async ({ page }) => {
    const busca = page.getByRole("searchbox", { name: "Buscar aparelho" });
    await busca.fill("pro max");
    await expect(page).toHaveURL(/q=pro\+max/);
    await expect(cards(page).first()).toContainText("Pro Max");

    await busca.fill("nao-existe-xyz");
    await expect(page.getByText("Nenhum aparelho encontrado.")).toBeVisible();
    await page.getByRole("button", { name: "Limpar filtros" }).click();
    await expect(cards(page)).toHaveCount(TOTAL);
    await expect(busca).toHaveValue("");
  });

  test("deep link restaura linha e ordenação; parâmetro inválido é ignorado", async ({ page }) => {
    await page.goto("/?linha=17&ordem=antigos");
    await expect(page.getByRole("combobox", { name: "Ordenar" })).toHaveValue("antigos");
    await expect(cards(page).locator("h3").first()).toHaveText("iPhone 17");
    await expect(cards(page).locator("h3").last()).toHaveText("iPhone 17e");

    await page.goto("/?linha=inexistente&ordem=hack");
    await expect(cards(page)).toHaveCount(TOTAL);
    await expect(page.getByRole("combobox", { name: "Ordenar" })).toHaveValue("recentes");
  });
});

test.describe("janela do produto", () => {
  test("abre em detalhes, fecha com Esc e devolve o foco", async ({ page }) => {
    const abrir = page.getByRole("button", { name: "Ver características do iPhone 11", exact: true });
    await abrir.click();
    const dialog = page.getByRole("dialog", { name: "iPhone 11" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("A13 Bionic")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(abrir).toBeFocused();
  });

  test("pedir orçamento foca o 1º vendedor com mensagem citando o aparelho", async ({ page }) => {
    await page.getByRole("button", { name: "Solicitar orçamento do iPhone 17", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "iPhone 17" });
    const vendedor = dialog.getByRole("link", { name: new RegExp(catalogo.vendedores[0].nome) });
    await expect(vendedor).toBeFocused();
    await expect(dialog.getByRole("button", { name: "Fechar" })).toBeInViewport();

    const href = new URL((await vendedor.getAttribute("href"))!);
    expect(href.pathname).toBe(`/${catalogo.vendedores[0].telefone}`);
    expect(href.searchParams.get("text")).toContain("iPhone 17");
  });

  test("clicar no fundo fecha", async ({ page }) => {
    await page.getByRole("button", { name: "Ver características do iPhone 11", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "iPhone 11" });
    await expect(dialog).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(dialog).toBeHidden();
  });
});

test.describe("comparação", () => {
  const comparar = (page: Page, nome: string) => page.getByRole("button", { name: `Comparar ${nome}`, exact: true });

  test("seleciona até 3, compara e persiste na URL", async ({ page }) => {
    const barra = page.getByRole("complementary", { name: "Comparação de aparelhos" });
    await comparar(page, "iPhone 15").click();
    await expect(barra).toBeVisible();
    await expect(barra.getByRole("button", { name: /Comparar \(1\)/ })).toBeDisabled();

    await comparar(page, "iPhone 16").click();
    await comparar(page, "iPhone 17").click();
    await expect(comparar(page, "iPhone 15")).toHaveAttribute("aria-pressed", "true");
    await expect(comparar(page, "iPhone 11")).toBeDisabled();
    await expect(page).toHaveURL(/comparar=iphone-15%2Ciphone-16%2Ciphone-17|comparar=iphone-15,iphone-16,iphone-17/);

    await barra.getByRole("button", { name: "Comparar (3)" }).click();
    const dialog = page.getByRole("dialog", { name: "Comparar modelos" });
    await expect(dialog.getByRole("columnheader")).toHaveText([/iPhone 15/, /iPhone 16/, /iPhone 17/]);
    await expect(dialog.getByRole("row", { name: /Chip/ })).toContainText("A16 Bionic");

    // "só diferenças" esconde linhas idênticas (Preço: todos "Sob consulta")
    await expect(dialog.getByRole("rowheader", { name: "Preço" })).toBeVisible();
    await dialog.getByRole("checkbox", { name: "Mostrar só as diferenças" }).check();
    await expect(dialog.getByRole("rowheader", { name: "Preço" })).toBeHidden();
    await expect(dialog.getByRole("rowheader", { name: "Chip" })).toBeVisible();

    // seleção sobrevive a reload
    await page.reload();
    await expect(barra.getByRole("listitem")).toHaveCount(3);
  });

  test("pedir orçamento a partir da comparação abre a janela do produto", async ({ page }) => {
    await page.goto("/?comparar=iphone-15,iphone-16");
    await page.getByRole("button", { name: "Comparar (2)" }).click();
    await page.getByRole("dialog", { name: "Comparar modelos" }).getByRole("button", { name: "Pedir orçamento do iPhone 16" }).click();
    await expect(page.getByRole("dialog", { name: "Comparar modelos" })).toBeHidden();
    await expect(page.getByRole("dialog", { name: "iPhone 16" })).toBeVisible();
  });

  test("ids inválidos ou duplicados na URL são descartados; remover e limpar funcionam", async ({ page }) => {
    await page.goto("/?comparar=iphone-15,nao-existe,iphone-15,iphone-16");
    const barra = page.getByRole("complementary", { name: "Comparação de aparelhos" });
    await expect(barra.getByRole("listitem")).toHaveCount(2);

    await barra.getByRole("button", { name: "Remover iPhone 15 da comparação" }).click();
    await expect(barra.getByRole("listitem")).toHaveCount(1);
    await barra.getByRole("button", { name: "Limpar" }).click();
    await expect(barra).toBeHidden();
    await expect(page).not.toHaveURL(/comparar=/);
  });

  test("a barra não cobre o rodapé", async ({ page }) => {
    await comparar(page, "iPhone 15").click();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const rodape = await page.locator("footer").boundingBox();
    const barra = await page.getByRole("complementary", { name: "Comparação de aparelhos" }).boundingBox();
    expect(rodape!.y + rodape!.height).toBeLessThanOrEqual(barra!.y + 1);
  });
});

test("painel admin carrega o catálogo publicado", async ({ page }) => {
  await page.goto("/admin.html");
  await expect(page.locator("#lista-produtos .item")).toHaveCount(TOTAL);
});
