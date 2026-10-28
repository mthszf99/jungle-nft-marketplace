import { test, expect } from "@playwright/test";

test("deve preservar a pesquisa mais recente quando respostas chegam fora de ordem", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Emerald Ape #042" }),
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

  // Primeira pesquisa
  await searchInput.fill("Emerald");
  await searchButton.click();

  await expect(page).toHaveURL(/search=Emerald/);

  // Segunda pesquisa
  await searchInput.fill("Golden");
  await searchButton.click();

  await expect(page).toHaveURL(/search=Golden/);

  // Confirma o resultado da pesquisa mais recente
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
});