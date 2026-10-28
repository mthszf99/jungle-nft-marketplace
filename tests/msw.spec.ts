import { test, expect } from "@playwright/test";

test.describe("MSW - Simulação de API", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Aguarda o MSW controlar a página antes das requisições.
    await expect
      .poll(
        () =>
          page.evaluate(async () => {
            const registration =
              await navigator.serviceWorker.getRegistration();

            return Boolean(
              registration?.active &&
              navigator.serviceWorker.controller,
            );
          }),
        {
          message: "Aguardando o MSW assumir o controle da página",
          timeout: 10000,
        },
      )
      .toBe(true);
  });

  test("deve retornar os NFTs normalmente", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const response = await fetch("/api/nfts");

      return {
        status: response.status,
        contentType: response.headers.get("content-type"),
        body: await response.json(),
      };
    });

    expect(result.status).toBe(200);
    expect(result.contentType).toContain("application/json");
    expect(result.body.items.length).toBeGreaterThan(0);
  });

  test("deve simular erro HTTP 500", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const response = await fetch(
        "/api/nfts?mockScenario=error",
      );

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    expect(result.status).toBe(500);

    expect(result.body.message).toBe(
      "Falha simulada ao carregar o catálogo.",
    );
  });

  test("deve simular resposta lenta", async ({ page }) => {
    const result = await page.evaluate(async () => {
      const start = performance.now();

      const response = await fetch(
        "/api/nfts?mockScenario=slow",
      );

      return {
        status: response.status,
        elapsed: performance.now() - start,
      };
    });

    expect(result.status).toBe(200);
    expect(result.elapsed).toBeGreaterThanOrEqual(2400);
  });
});