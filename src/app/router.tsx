import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { NotFoundPage } from "../pages/NotFoundPage";

// Rota principal da aplicação
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
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