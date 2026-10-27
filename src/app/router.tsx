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