import { Link } from "@tanstack/react-router";
import {
  Home,
  Heart,
  ShoppingCart,
  UserRound,
} from "lucide-react";

type NavigationItem = {
  label: string;
  icon: typeof Home;
  to?: "/" | "/carrinho";
};

const navigationItems: NavigationItem[] = [
  {
    label: "Início",
    icon: Home,
    to: "/",
  },
  {
    label: "Favoritos",
    icon: Heart,
  },
  {
    label: "Carrinho",
    icon: ShoppingCart,
    to: "/carrinho",
  },
  {
    label: "Perfil",
    icon: UserRound,
  },
];

export function MobileNavigation() {
  return (
    <nav
      aria-label="Navegação mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-kurio-border bg-kurio-surface md:hidden"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          if (!item.to) {
            return (
              <span
                key={item.label}
                className="flex flex-col items-center gap-1 text-kurio-muted"
                aria-disabled="true"
              >
                <Icon size={20} />

                <span className="text-[10px]">
                  {item.label}
                </span>
              </span>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.to}
              activeOptions={{ exact: true }}
              activeProps={{
                className: "text-kurio-primary",
              }}
              inactiveProps={{
                className: "text-kurio-muted",
              }}
              className="flex flex-col items-center gap-1 transition-colors hover:text-kurio-primary"
            >
              <Icon size={20} />

              <span className="text-[10px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}