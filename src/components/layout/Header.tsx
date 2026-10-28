import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart } from "lucide-react";

import { useMarketplace } from "../../state/MarketplaceProvider";

export function Header() {
  const { cart, user } = useMarketplace();
  return (
    <header className="border-b border-kurio-border bg-kurio-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:px-6">
        {/* Logotipo */}
        <Link
          to="/"
          className="shrink-0 text-lg font-bold tracking-[0.2em] text-kurio-text md:text-xl md:tracking-[0.3em]"
        >
          KURIO
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            activeProps={{
              className: "text-kurio-primary",
            }}
            activeOptions={{ exact: true }}
            className="text-sm text-kurio-muted transition-colors hover:text-kurio-primary"
          >
            Início
          </Link>

          <span className="text-sm text-kurio-muted">Mercado</span>

          <span className="text-sm text-kurio-muted">Criadores</span>

          <span className="text-sm text-kurio-muted">Aprenda</span>
        </nav>

        {/* Ações */}
        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Pesquisar NFTs"
            className="flex size-9 items-center justify-center text-kurio-text transition-colors hover:text-kurio-primary"
          >
            <Search size={19} />
          </button>

          <Link
            to="/carrinho"
            aria-label="Abrir carrinho"
            className="hidden text-kurio-text transition-colors hover:text-kurio-primary md:flex"
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="ml-1 text-xs text-kurio-primary">{cart.length}</span>
            )}
          </Link>

          <Link
            to={user ? "/perfil" : "/login"}
            className="rounded-lg bg-kurio-primary px-3 py-2 text-sm font-semibold text-kurio-background hover:bg-kurio-primary-hover md:px-4"
          >
            {user ? "Meu perfil" : "Entrar"}
          </Link>
        </div>
      </div>
    </header>
  );
}
