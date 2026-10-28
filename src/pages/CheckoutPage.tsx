import { Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMarketplace } from "../state/MarketplaceProvider";
import { totalEth } from "../lib/eth";
import { requestPurchase } from "../services/purchase";
import { useNFTAvailability } from "../state/NFTAvailabilityProvider";


export function CheckoutPage() {
  const { cart, user, checkout } = useMarketplace();
  const { isSold } = useNFTAvailability();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const key = useRef(crypto.randomUUID());

async function submit() {
  if (loading) return;

  setLoading(true);
  setError("");

  try {
    const unavailableNFTs = cart.filter((nft) =>
      isSold(nft.id),
    );

    if (unavailableNFTs.length) {
      throw new Error(
        `NFTs indisponíveis: ${unavailableNFTs
          .map((nft) => nft.name)
          .join(", ")}`,
      );
    }

    const response = await requestPurchase(
      key.current,
      cart.map((nft) => nft.id),
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    const order = checkout(key.current);

    await navigate({
      to: "/pedido/$orderId",
      params: {
        orderId: order.id,
      },
    });
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Erro ao finalizar pedido.",
    );
  } finally {
    setLoading(false);
  }
}
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      {!user ? (
        <div className="rounded-2xl border border-kurio-border bg-kurio-surface p-8">
          <p className="mb-5">Entre na sua conta para finalizar o pedido.</p>
          <Link to="/login" search={{ redirect: "/checkout" }} className="text-kurio-primary">
            Entrar →
          </Link>
        </div>
      ) : !cart.length ? (
        <div className="rounded-2xl border border-kurio-border p-8">
          Carrinho vazio.{" "}
          <Link to="/" className="text-kurio-primary">
            Explorar NFTs
          </Link>
        </div>
      ) : (
        <section className="space-y-5 rounded-2xl border border-kurio-border bg-kurio-surface p-7">
          <h2 className="text-xl font-semibold">Revise seu pedido</h2>
          <p className="text-sm text-kurio-muted">Comprador: {user.email}</p>
          {cart.map((nft) => (
            <div
              key={nft.id}
              className="flex justify-between gap-3 border-b border-kurio-border py-3"
            >
              <span>{nft.name}</span>
              <span className="whitespace-nowrap text-kurio-primary">{nft.priceEth} ETH</span>
            </div>
          ))}
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-kurio-primary">
              {totalEth(cart.map((nft) => nft.priceEth))} ETH
            </span>
          </div>
          <p className="text-xs text-kurio-muted">
            Ambiente demonstrativo: nenhuma transação real será realizada.
          </p>
          {error && (
            <p role="alert" className="text-red-400">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="w-full rounded-xl bg-kurio-primary p-3 font-bold text-kurio-background disabled:opacity-60"
          >
            {loading ? "Processando..." : "Confirmar pedido (simulação)"}
          </button>
        </section>
      )}
    </main>
  );
}
