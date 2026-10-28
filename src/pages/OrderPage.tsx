import { Link, useParams } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useMarketplace } from "../state/MarketplaceProvider";
export function OrderPage() {
  const { orderId } = useParams({ from: "/pedido/$orderId" });
  const { orders, user } = useMarketplace();
  const order = orders.find((item) => item.id === orderId && item.email === user?.email);
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      {order ? (
        <div className="rounded-3xl border border-kurio-border bg-kurio-surface p-10">
          <CheckCircle2 size={56} className="mx-auto mb-5 text-kurio-primary" />
          <h1 className="mb-4 text-3xl font-bold">Pedido confirmado!</h1>
          <p className="mb-5 text-kurio-muted">Sua compra demonstrativa foi registrada.</p>
          <p className="break-all text-xs text-kurio-muted">Pedido: {order.id}</p>
          <p className="mt-5 text-xl font-bold text-kurio-primary">{order.totalEth} ETH</p>
          <p className="mt-2 text-sm text-kurio-muted">{order.items.length} NFT(s)</p>
          <Link to="/perfil" className="mt-7 inline-block text-kurio-primary">
            Ver meus pedidos →
          </Link>
        </div>
      ) : (
        <div>
          Pedido não encontrado.{" "}
          <Link to="/" className="text-kurio-primary">
            Voltar ao início
          </Link>
        </div>
      )}
    </main>
  );
}
