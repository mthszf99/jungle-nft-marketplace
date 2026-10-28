import { test, expect } from "@playwright/test";

test("Playwright está funcionando", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();
});
