import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "@tanstack/react-router";

import { QueryProvider } from "./app/providers/QueryProvider";
import { router } from "./app/router";

import "./index.css";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");

    await worker.start();
  }
}

async function bootstrap() {

  await enableMocking();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </StrictMode>
  );
}

void bootstrap();