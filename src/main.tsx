import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "@tanstack/react-router";

import { QueryProvider } from "./app/providers/QueryProvider";
import { router } from "./app/router";
import { MarketplaceProvider } from "./state/MarketplaceProvider";

import "./index.css";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  await worker.start();
}

async function bootstrap() {
  await enableMocking();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryProvider>
        <MarketplaceProvider>
          <RouterProvider router={router} />
        </MarketplaceProvider>
      </QueryProvider>
    </StrictMode>,
  );
}

void bootstrap();
