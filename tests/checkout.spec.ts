import { test, expect } from "@playwright/test";

test.describe("Carrinho e checkout", () => {
  test.beforeEach(async ({ page }) => {
    // Cada teste começa com uma sessão limpa.
    await page.goto("/");

    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.reload();
  });

  test("deve abrir os detalhes de um NFT", async ({ page }) => {
    await page.goto("/");

await page
  .getByRole("link", {
    name: "Emerald Ape #042",
    exact: true,
  })
  .last()
  .click();

    await expect(page).toHaveURL(/\/nft\/nft-001/);

    await expect(
      page.getByText("Emerald Ape #042").first(),
    ).toBeVisible();
  });

  test("deve informar quando o carrinho está vazio", async ({
    page,
  }) => {
    await page.goto("/carrinho");

    await expect(
      page.getByText("Seu carrinho está vazio."),
    ).toBeVisible();
  });

  test("deve impedir checkout sem autenticação", async ({
    page,
  }) => {
    await page.goto("/checkout");

    await expect(
      page.getByText("Entre na sua conta para finalizar o pedido."),
    ).toBeVisible();

await expect(
  page.getByRole("link", {
    name: "Entrar →",
    exact: true,
  }),
).toBeVisible();
  });

test("deve adicionar um NFT ao carrinho", async ({ page }) => {
  await page.goto("/nft/nft-001");

  await page
    .getByRole("button", { name: "Adicionar ao carrinho" })
    .click();

  await expect(
    page.getByRole("button", { name: "Adicionado ao carrinho" }),
  ).toBeDisabled();

  await page.getByRole("link", { name: "Ver carrinho" }).click();

  await expect(page).toHaveURL(/\/carrinho/);

  await expect(
    page.getByRole("heading", { name: /Meu carrinho/ }),
  ).toContainText("(1)");

  await expect(
    page.getByText("Emerald Ape #042").first(),
  ).toBeVisible();

  await expect(
    page.getByText("1.19 ETH").first(),
  ).toBeVisible();
});

test("deve remover um NFT do carrinho", async ({ page }) => {
  await page.goto("/nft/nft-001");

  await page
    .getByRole("button", { name: "Adicionar ao carrinho" })
    .click();

  await page.goto("/carrinho");

  await page
    .getByRole("button", { name: "Remover Emerald Ape #042" })
    .click();

  await expect(
    page.getByText("Seu carrinho está vazio."),
  ).toBeVisible();
});

test("deve finalizar uma compra após o login", async ({ page }) => {
  // 1. Abre os detalhes do NFT
  await page.goto("/nft/nft-001");

  await expect(
    page.getByRole("heading", { name: "Emerald Ape #042" }),
  ).toBeVisible();

  // 2. Adiciona ao carrinho
  await page
    .getByRole("button", { name: "Adicionar ao carrinho" })
    .click();

  await expect(
    page.getByRole("button", { name: "Adicionado ao carrinho" }),
  ).toBeDisabled();

  // 3. Abre o carrinho
  await page.getByRole("link", { name: /Ver carrinho/ }).click();

  await expect(page).toHaveURL(/\/carrinho/);

  await expect(
    page.getByRole("heading", { name: /Meu carrinho/ }),
  ).toContainText("(1)");

  // 4. Avança para o checkout
  await page
    .getByRole("link", { name: "Finalizar compra" })
    .click();

  await expect(page).toHaveURL(/\/checkout/);

  await expect(
    page.getByText("Entre na sua conta para finalizar o pedido."),
  ).toBeVisible();

  // 5. Acessa o login pelo checkout
  await page
    .getByRole("link", { name: "Entrar →", exact: true })
    .click();

  await expect(page).toHaveURL(/\/login/);

  // 6. Preenche os dados demonstrativos
  await page.getByLabel("E-mail").fill("teste@kurio.dev");

  await page.getByLabel("Senha").fill("teste123");

  await page
    .getByRole("button", { name: "Entrar", exact: true })
    .click();

  // 7. Verifica o retorno ao checkout
  await expect(page).toHaveURL(/\/checkout/);

  await expect(
    page.getByRole("heading", { name: "Revise seu pedido" }),
  ).toBeVisible();

  await expect(
    page.getByText("Comprador: teste@kurio.dev"),
  ).toBeVisible();

  // 8. Confirma a compra simulada
  await page
    .getByRole("button", { name: "Confirmar pedido (simulação)" })
    .click();

  // 9. Verifica o redirecionamento para o pedido
  await expect(page).toHaveURL(/\/pedido\/[^/]+/);
});


});