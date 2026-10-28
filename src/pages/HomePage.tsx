import { HeroBanner } from "@/components/home/HeroBanner";
import { NFTGrid } from "../components/nft/NFTGrid";
import { NFTSearch } from "../components/nft/NFTSearch";
import { NFTFilters } from "../components/nft/NFTFilters";
import { NFTSort } from "../components/nft/NFTSort";

export function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <HeroBanner />

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-kurio-primary">Explore o marketplace</p>

          <h2 className="text-2xl font-bold text-kurio-text md:text-3xl">
            Descubra NFTs incríveis
          </h2>

          <p className="mt-2 text-sm text-kurio-muted">
            Explore coleções exclusivas e encontre seu próximo NFT.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <NFTSearch />

          <NFTSort />
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <NFTFilters />

          <div className="min-w-0">
            <NFTGrid />
          </div>
        </div>
      </section>
    </main>
  );
}
