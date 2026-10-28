import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { NFT } from "../types/nft";
import { useMarketplace } from "../state/MarketplaceProvider";
import { useNFTAvailability } from "../state/NFTAvailabilityProvider";
export function NFTDetailPage() {
  const { nftId } = useParams({ from: "/nft/$nftId" });
  const { add, cart } = useMarketplace();
  const { isSold } = useNFTAvailability();
  const {
    data: nft,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["nft", nftId],
    queryFn: async () => (await api.get<NFT>(`/nfts/${nftId}`)).data,
  });
  if (isPending)
    return <main className="mx-auto max-w-6xl p-8 text-kurio-muted">Carregando NFT...</main>;
  if (isError || !nft)
    return (
      <main className="mx-auto max-w-6xl p-8">
        NFT não encontrado.{" "}
        <Link to="/" className="text-kurio-primary">
          Voltar ao catálogo
        </Link>
      </main>
    );
  const added = cart.some((item) => item.id === nft.id);
  const sold = isSold(nft.id);
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <Link to="/" className="text-sm text-kurio-primary">
        ← Voltar ao mercado
      </Link>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <img
          src={nft.imageUrl}
          alt={nft.name}
          className="aspect-square w-full rounded-3xl object-cover"
        />
        <section className="space-y-6">
          <p className="text-kurio-primary">
            {nft.collection} · #{nft.tokenId}
          </p>
          <h1 className="text-4xl font-bold">{nft.name}</h1>
          <p className="text-kurio-muted">{nft.description}</p>
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-kurio-border bg-kurio-surface p-5 text-sm">
            <div>
              <p className="text-kurio-muted">Blockchain</p>
              <p className="mt-2 capitalize">{nft.network}</p>
            </div>
            <div>
              <p className="text-kurio-muted">Edição</p>
              <p className="mt-2">{nft.edition}</p>
            </div>
            <div>
              <p className="text-kurio-muted">Categoria</p>
              <p className="mt-2">{nft.category}</p>
            </div>
            <div>
              <p className="text-kurio-muted">Raridade</p>
              <p className="mt-2">{nft.isRare ? "Raro" : "Regular"}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-kurio-border p-6">
            <p className="text-sm text-kurio-muted">Preço atual</p>
            <p className="my-3 text-3xl font-bold text-kurio-primary">{nft.priceEth} ETH</p>
            <button
              type="button"
              onClick={() => {
                if (!sold) {
                  add(nft);
                }
              }}
              disabled={added || sold}
              className={`w-full rounded-xl px-5 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                sold
                  ? "bg-red-500 text-white"
                  : "bg-kurio-primary text-kurio-background"
              }`}
            >
              {sold
                ? "NFT vendido"
                : added
                  ? "Adicionado ao carrinho"
                  : "Adicionar ao carrinho"}
            </button>
            {added && !sold && (
              <Link to="/carrinho" className="mt-4 block text-center text-kurio-primary">
                Ver carrinho →
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
