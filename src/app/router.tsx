import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";

import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

const rootRoute = createRootRoute({
  component: AppLayout,
});

// Página inicial
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,

validateSearch: (
  search: Record<string, unknown>
): {
  search?: string;
  categories?: string[];
  networks?: string[];
} => {
  function parseArray(value: unknown): string[] | undefined {
    if (typeof value === "string") {
      const values = value.split(",").filter(Boolean);
      return values.length > 0 ? values : undefined;
    }

    if (Array.isArray(value)) {
      const values = value.filter(
        (item): item is string => typeof item === "string"
      );

      return values.length > 0 ? values : undefined;
    }

    return undefined;
  }

  return {
    search:
      typeof search.search === "string"
        ? search.search
        : undefined,

    categories: parseArray(search.categories),
    networks: parseArray(search.networks),
  };
},
});

// Página do carrinho
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carrinho",
  component: CartPage,
});

// Árvore de rotas
const routeTree = rootRoute.addChildren([
  homeRoute,
  cartRoute,
]);

// Instância do Router
export const router = createRouter({
  routeTree,
});

// Registro dos tipos do Router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}