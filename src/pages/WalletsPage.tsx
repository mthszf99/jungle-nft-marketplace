import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMarketplace } from "../state/MarketplaceProvider";
export function WalletsPage() {
  const { user, wallets, connectWallet, disconnectWallet } = useMarketplace();
  const [address, setAddress] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = address.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(value)) return;
    connectWallet(value);
    setAddress("");
  }
  if (!user)
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        Faça{" "}
        <Link to="/login" search={{ redirect: undefined }} className="text-kurio-primary">
          login
        </Link>{" "}
        para gerenciar carteiras.
      </main>
    );
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-5 text-3xl font-bold">Minhas carteiras</h1>
      <p className="mb-8 text-sm text-kurio-muted">
        Adicione endereços Ethereum para organizar suas carteiras. Esta demonstração não realiza
        conexão Web3 nem solicita chaves privadas.
      </p>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Endereço da carteira"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          pattern="0x[a-fA-F0-9]{40}"
          required
          className="min-w-0 flex-1 rounded-xl border border-kurio-border bg-kurio-surface p-3"
        />
        <button className="rounded-xl bg-kurio-primary px-5 py-3 font-bold text-kurio-background">
          Adicionar
        </button>
      </form>
      <div className="mt-8 space-y-3">
        {wallets.length === 0 ? (
          <p className="text-kurio-muted">Nenhuma carteira cadastrada.</p>
        ) : (
          wallets.map((wallet) => (
            <div
              key={wallet}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-kurio-border bg-kurio-surface p-4"
            >
              <span className="break-all text-sm">{wallet}</span>
              <button onClick={() => disconnectWallet(wallet)} className="text-sm text-red-400">
                Remover
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
