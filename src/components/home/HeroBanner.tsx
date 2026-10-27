import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  function handleExplore() {
    document.getElementById("catalogo")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <section aria-labelledby="hero-title">
      {/* Banner desktop */}
      <div className="hidden items-center gap-12 md:grid md:grid-cols-2">
        <div>
          <p className="mb-5 text-xs tracking-[0.15em] text-kurio-text">
            Bem-vindo à Kurio
          </p>

          <h1
            id="hero-title"
            className="max-w-xl text-4xl font-bold leading-[1.35] text-kurio-text lg:text-5xl"
          >
            SEJA DONO DO FUTURO DA ARTE DIGITAL
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-kurio-muted">
            Descubra NFTs selecionados de criadores emergentes e consagrados.
            Colecione arte digital rara, apoie artistas e tenha uma parte da
            cultura da internet.
          </p>

          <button
            type="button"
            onClick={handleExplore}
            className="mt-7 rounded-md bg-kurio-primary px-7 py-3 text-sm font-semibold text-kurio-background transition-colors hover:bg-kurio-primary-hover"
          >
            EXPLORAR
          </button>
        </div>

        <div className="flex justify-end">
          <img
            src="/images/nfts/emerald-ape.png"
            alt="Emerald Ape, macaco com óculos verdes e jaqueta verde"
            className="aspect-square w-full max-w-md rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Banner mobile */}
      <div className="relative overflow-hidden rounded-3xl bg-kurio-surface p-4 md:hidden">
        <div className="relative z-10 flex min-h-48 items-center">
          <div className="w-[58%]">
            <p className="mb-2 text-xs text-kurio-text">
              Bem-vindo à Kurio
            </p>

            <h1 className="text-xl font-bold leading-snug text-kurio-text">
              SEJA DONO DA CULTURA DIGITAL
            </h1>

            <p className="mt-3 text-xs leading-relaxed text-kurio-muted">
              Descubra NFTs selecionados de criadores do mundo todo.
            </p>

            <button
              type="button"
              onClick={handleExplore}
              className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-kurio-primary"
            >
              EXPLORAR
              <ArrowRight size={15} />
            </button>
          </div>

          <img
            src="/images/nfts/emerald-ape.png"
            alt="NFT Emerald Ape em destaque"
            className="absolute right-0 top-1/2 aspect-square w-[45%] -translate-y-1/2 rounded-2xl object-cover"
          />
        </div>

        {/* Indicadores visuais do banner */}
        <div
          className="relative z-10 mt-3 flex justify-center gap-1.5"
          aria-hidden="true"
        >
          <span className="size-2 rounded-full bg-kurio-primary" />
          <span className="size-2 rounded-full bg-kurio-primary/50" />
          <span className="size-2 rounded-full bg-kurio-primary/50" />
        </div>
      </div>
    </section>
  );
}