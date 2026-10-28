import { test, expect } from "@playwright/test";

test.describe("Catálogo de NFTs", () => {
  test("deve carregar os NFTs", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText("Emerald Ape #042").first()
    ).toBeVisible();

    await expect(
      page.getByText("Sage Nomad #009").first()
    ).toBeVisible();
  });

  test("deve exibir os novos NFTs", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText("Golden Guardian #104").first()
    ).toBeVisible();
  });

  test("deve carregar a segunda página", async ({ page }) => {
    await page.goto("/?page=2");

    await expect(
      page.getByText("Cosmic Vessel #992").first()
    ).toBeVisible();
  });
});
