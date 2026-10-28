import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { NFTDetailPage } from "../pages/NFTDetailPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderPage } from "../pages/OrderPage";
import { AuthPage } from "../pages/AuthPage";
import { ProfilePage } from "../pages/ProfilePage";
import { WalletsPage } from "../pages/WalletsPage";
import type { NFTSort } from "../types/catalog";

const rootRoute = createRootRoute({
  component: AppLayout,
});

// Página inicial
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,

  validateSearch: (
    search: Record<string, unknown>,
  ): {
    search?: string;
    categories?: string[];
    networks?: string[];
    sort?: NFTSort;
    page?: number;
  } => {
    function parseArray(value: unknown): string[] | undefined {
      if (typeof value === "string") {
        const values = value.split(",").filter(Boolean);
        return values.length > 0 ? values : undefined;
      }

      if (Array.isArray(value)) {
        const values = value.filter((item): item is string => typeof item === "string");

        return values.length > 0 ? values : undefined;
      }

      return undefined;
    }

    return {
      search: typeof search.search === "string" ? search.search : undefined,
      sort:
        search.sort === "price-asc" || search.sort === "price-desc" || search.sort === "recent"
          ? search.sort
          : undefined,
      page:
        typeof search.page === "number" && Number.isSafeInteger(search.page) && search.page > 0
          ? search.page
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

const nftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nft/$nftId",
  component: NFTDetailPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pedido/$orderId",
  component: OrderPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <AuthPage mode="login" />,
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: s.redirect === "/checkout" ? "/checkout" : undefined,
  }),
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cadastro",
  component: () => <AuthPage mode="cadastro" />,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/perfil",
  component: ProfilePage,
});
const walletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carteiras",
  component: WalletsPage,
});
// Árvore de rotas
const routeTree = rootRoute.addChildren([
  homeRoute,
  cartRoute,
  nftRoute,
  checkoutRoute,
  orderRoute,
  loginRoute,
  signupRoute,
  profileRoute,
  walletsRoute,
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
