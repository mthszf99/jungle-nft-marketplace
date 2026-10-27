import { HeroBanner } from "@/components/home/HeroBanner";

export function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <HeroBanner />

      <section
        id="catalogo"
        aria-labelledby="catalogo-title"
        className="mt-16 scroll-mt-8"
      >
        <h2
          id="catalogo-title"
          className="text-xl font-semibold text-kurio-primary"
        >
          Todos os NFTs
        </h2>

        <p className="mt-3 text-sm text-kurio-muted">
          Em breve, você poderá explorar nossa coleção de NFTs.
        </p>
      </section>
    </main>
  );
}