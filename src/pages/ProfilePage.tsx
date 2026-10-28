import { Link, useNavigate } from "@tanstack/react-router";
import { useMarketplace } from "../state/MarketplaceProvider";
export function ProfilePage() {
  const { user, orders, signOut } = useMarketplace();
  const navigate = useNavigate();
  if (!user)
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        Faça{" "}
        <Link to="/login" search={{ redirect: undefined }} className="text-kurio-primary">
          login
        </Link>{" "}
        para ver seu perfil.
      </main>
    );
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="rounded-2xl border border-kurio-border bg-kurio-surface p-8">
        <h1 className="text-3xl font-bold">Olá, {user.name}!</h1>
        <p className="mt-2 text-kurio-muted">{user.email}</p>
        <div className="mt-6 flex gap-5">
          <Link to="/carteiras" className="text-kurio-primary">
            Minhas carteiras →
          </Link>
          <button
            onClick={() => {
              signOut();
              void navigate({ to: "/" });
            }}
            className="text-kurio-muted underline"
          >
            Sair
          </button>
        </div>
      </div>
      <section>
        <h2 className="mb-5 text-2xl font-bold">Meus pedidos</h2>
        {orders.filter((order) => order.email === user.email).length === 0 ? (
          <p className="text-kurio-muted">Você ainda não realizou pedidos.</p>
        ) : (
          orders
            .filter((order) => order.email === user.email)
            .map((order) => (
              <Link
                key={order.id}
                to="/pedido/$orderId"
                params={{ orderId: order.id }}
                className="mb-3 block rounded-xl border border-kurio-border bg-kurio-surface p-5"
              >
                <p className="font-semibold">Pedido {order.id.slice(0, 8)}</p>
                <p className="mt-2 text-sm text-kurio-muted">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")} · {order.items.length}{" "}
                  NFT(s) · {order.totalEth} ETH
                </p>
              </Link>
            ))
        )}
      </section>
    </main>
  );
}
