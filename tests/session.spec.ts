import { test, expect } from "@playwright/test";

test("deve manter os pedidos separados por usuário", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // 1. Login do primeiro usuário
  await page.goto("/login");

  await page.getByLabel("E-mail").fill("usuario1@teste.com");
  await page.getByLabel("Senha").fill("teste123");

  await page
    .getByRole("button", { name: "Entrar", exact: true })
    .click();

  // 2. Adiciona um NFT ao carrinho
  await page.goto("/nft/nft-001");

  await page
    .getByRole("button", { name: "Adicionar ao carrinho" })
    .click();

  // 3. Finaliza a compra
  await page.goto("/checkout");

  await page
    .getByRole("button", { name: "Confirmar pedido (simulação)" })
    .click();

  await expect(page).toHaveURL(/\/pedido\/[^/]+/);

  // Guarda o ID do pedido criado
  const orderUrl = new URL(page.url());
  const orderId = orderUrl.pathname.split("/").pop();

  expect(orderId).toBeTruthy();

  // 4. Confirma o pedido no perfil do primeiro usuário
  await page.goto("/perfil");

  await expect(
    page.getByRole("heading", { name: "Meus pedidos" }),
  ).toBeVisible();

  await expect(
    page.locator(`a[href="/pedido/${orderId}"]`),
  ).toBeVisible();

  // 5. Faz logout
  await page.getByRole("button", { name: "Sair" }).click();

  // 6. Login do segundo usuário
  await page.goto("/login");

  await page.getByLabel("E-mail").fill("usuario2@teste.com");
  await page.getByLabel("Senha").fill("teste123");

  await page
    .getByRole("button", { name: "Entrar", exact: true })
    .click();

  // 7. Verifica o isolamento dos pedidos
  await page.goto("/perfil");

  await expect(
    page.getByText("usuario2@teste.com"),
  ).toBeVisible();

  await expect(
    page.locator(`a[href="/pedido/${orderId}"]`),
  ).toHaveCount(0);

  // 8. Confirma que o pedido continua salvo para o primeiro usuário
  await page.getByRole("button", { name: "Sair" }).click();

  await page.goto("/login");

  await page.getByLabel("E-mail").fill("usuario1@teste.com");
  await page.getByLabel("Senha").fill("teste123");

  await page
    .getByRole("button", { name: "Entrar", exact: true })
    .click();

  await page.goto("/perfil");

  await expect(
    page.locator(`a[href="/pedido/${orderId}"]`),
  ).toBeVisible();
});