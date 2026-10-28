import { test, expect } from "@playwright/test";

test("não deve sobrescrever a pesquisa atual com uma resposta antiga", async ({
  page,
}) => {
  await page.goto("/");

  // Aguarda o catálogo inicial e o MSW estar ativo.
  await expect(
    page.getByRole("heading", {
      name: "Emerald Ape #042",
      exact: true,
    }),
  ).toBeVisible();

  const searchInput = page.getByRole("searchbox", {
    name: "Buscar NFTs",
  });

  const searchButton = page
    .getByRole("search")
    .getByRole("button", {
      name: "Pesquisar",
      exact: true,
    });

  // Primeira pesquisa: demora 2 segundos.
  await searchInput.fill("Emerald");
  await searchButton.click();

  await expect(page).toHaveURL(/search=Emerald/);

  // Confirma que a primeira pesquisa ainda está carregando.
  await expect(
    page.getByRole("status"),
  ).toContainText("Carregando NFTs");

  // Segunda pesquisa: demora apenas 100 ms.
  await searchInput.fill("Golden");
  await searchButton.click();

  await expect(page).toHaveURL(/search=Golden/);

  // A segunda pesquisa deve terminar primeiro.
  await expect(
    page.getByRole("heading", {
      name: "Golden Guardian #104",
      exact: true,
    }),
  ).toBeVisible();

  // Aguarda a conclusão da primeira pesquisa.
  await page.waitForTimeout(2200);

  // O resultado atual deve continuar correto.
  await expect(
    page.getByRole("heading", {
      name: "Golden Guardian #104",
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Emerald Ape #042",
      exact: true,
    }),
  ).toHaveCount(0);

  await expect(page).toHaveURL(/search=Golden/);
});