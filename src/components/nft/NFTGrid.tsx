import { useNFTs } from "../../hooks/useNFTs";
import { NFTCard } from "./NFTCard";
import { useSearch } from "@tanstack/react-router";
import type { NFTCategory, NFTNetwork } from "../../types/nft";
import { NFTPagination } from "./NFTPagination";

export function NFTGrid() {
  const { search, categories, networks, sort, page } = useSearch({
    from: "/",
  });

  const { data, isPending, isError, refetch } = useNFTs({
    search,
    categories: categories as NFTCategory[] | undefined,
    networks: networks as NFTNetwork[] | undefined,
    sort,
    page: page ?? 1,
    limit: 9,
  });

  if (isPending) {
    return (
      <div role="status" className="py-16 text-center text-kurio-muted">
        Carregando NFTs...
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-kurio-muted">Não foi possível carregar os NFTs.</p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="cursor-pointer rounded-lg bg-kurio-primary px-5 py-2 font-semibold text-kurio-background transition-colors hover:bg-kurio-primary-hover"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return <div className="py-16 text-center text-kurio-muted">Nenhum NFT encontrado.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.items.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>

      <NFTPagination totalPages={data.pagination.totalPages} />
    </div>
  );
}
