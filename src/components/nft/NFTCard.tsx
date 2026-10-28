import { Link } from "@tanstack/react-router";
import type { NFT } from "../../types/nft";

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-kurio-border bg-kurio-surface transition-all duration-300 hover:-translate-y-1 hover:border-kurio-primary">
      {/* Imagem */}
      <Link
        to="/nft/$nftId"
        params={{ nftId: nft.id }}
        className="relative block aspect-square overflow-hidden bg-kurio-surface-light"
      >
        <img
          src={nft.imageUrl}
          alt={nft.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Identificação de raridade */}
        {nft.isRare && (
          <span className="absolute top-3 left-3 rounded-full bg-kurio-primary px-3 py-1 text-xs font-semibold text-kurio-background">
            Raro
          </span>
        )}
      </Link>

      {/* Informações */}
      <div className="space-y-3 p-4">
        <div>
          <p className="mb-1 text-xs text-kurio-muted">{nft.collection}</p>

          <h3 className="truncate text-base font-semibold text-kurio-text">
            <Link to="/nft/$nftId" params={{ nftId: nft.id }} className="hover:text-kurio-primary">
              {nft.name}
            </Link>
          </h3>
        </div>

        <div className="flex items-center justify-between border-t border-kurio-border pt-3">
          <span className="text-xs text-kurio-muted">Preço</span>

          <span className="text-sm font-bold text-kurio-primary">{nft.priceEth} ETH</span>
        </div>
      </div>
    </article>
  );
}
