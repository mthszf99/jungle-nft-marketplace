import { test, expect } from "@playwright/test";

test("não deve duplicar pedidos ao reutilizar a mesma chave", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Login demonstrativo
  await page.goto("/login");
  await page.getByLabel("E-mail").fill("idempotencia@teste.com");
  await page.getByLabel("Senha").fill("teste123");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();

  // Adiciona o NFT
  await page.goto("/nft/nft-001");
  await page
    .getByRole("button", { name: "Adicionar ao carrinho" })
    .click();

  // Finaliza o pedido
  await page.goto("/checkout");
  await page
    .getByRole("button", { name: "Confirmar pedido (simulação)" })
    .click();

  await expect(page).toHaveURL(/\/pedido\/[^/]+/);

  const firstOrderUrl = page.url();

  // Confirma que existe apenas um pedido no perfil
  await page.goto("/perfil");

  await expect(
    page.locator('a[href^="/pedido/"]'),
  ).toHaveCount(1);

  // Atualiza a página e verifica que o pedido não foi duplicado
  await page.reload();

  await expect(
    page.locator('a[href^="/pedido/"]'),
  ).toHaveCount(1);

  await expect(
    page.locator(`a[href="${new URL(firstOrderUrl).pathname}"]`),
  ).toBeVisible();
});