import { Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useMarketplace } from "../state/MarketplaceProvider";
import { totalEth } from "../lib/eth";
export function CartPage() {
  const { cart, remove, clear } = useMarketplace();
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <h1 className="mb-8 text-3xl font-bold">
        Meu carrinho <span className="text-kurio-primary">({cart.length})</span>
      </h1>
      {cart.length === 0 ? (
        <div className="rounded-2xl border border-kurio-border bg-kurio-surface p-12 text-center">
          <p className="mb-5 text-kurio-muted">Seu carrinho está vazio.</p>
          <Link to="/" className="text-kurio-primary">
            Explorar NFTs →
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {cart.map((nft) => (
              <article
                key={nft.id}
                className="flex items-center gap-4 rounded-2xl border border-kurio-border bg-kurio-surface p-4"
              >
                <Link to="/nft/$nftId" params={{ nftId: nft.id }}>
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{nft.name}</p>
                  <p className="text-sm text-kurio-muted">{nft.collection}</p>
                  <p className="mt-2 font-bold text-kurio-primary">{nft.priceEth} ETH</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(nft.id)}
                  aria-label={`Remover ${nft.name}`}
                  className="rounded-lg p-2 text-kurio-muted hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
              </article>
            ))}
            <button onClick={clear} className="text-sm text-kurio-muted underline">
              Limpar carrinho
            </button>
          </div>
          <aside className="h-fit rounded-2xl border border-kurio-border bg-kurio-surface p-6">
            <h2 className="mb-5 text-xl font-bold">Resumo do pedido</h2>
            <div className="flex justify-between text-kurio-muted">
              <span>{cart.length} NFT(s)</span>
              <span>{totalEth(cart.map((nft) => nft.priceEth))} ETH</span>
            </div>
            <div className="my-5 border-t border-kurio-border" />
            <div className="mb-6 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-kurio-primary">
                {totalEth(cart.map((nft) => nft.priceEth))} ETH
              </span>
            </div>
            <Link
              to="/checkout"
              className="block rounded-xl bg-kurio-primary px-4 py-3 text-center font-semibold text-kurio-background"
            >
              Finalizar compra
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
