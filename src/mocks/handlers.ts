import { delay, http, HttpResponse } from "msw";
import { mockNFTs } from "./data";
import { toWei } from "../lib/eth";

type MockScenario = "normal" | "slow" | "error";

function getMockScenario(request: Request): MockScenario {
  const url = new URL(request.url);

  // As simulações ficam disponíveis apenas no ambiente de desenvolvimento.
  if (!import.meta.env.DEV) {
    return "normal";
  }

  const scenario = url.searchParams.get("mockScenario");

  if (scenario === "slow" || scenario === "error") {
    return scenario;
  }

  return "normal";
}

export const handlers = [
  http.get("/api/nfts/:id", ({ params }) => {
    const nft = mockNFTs.find((item) => item.id === params.id);
    return nft
      ? HttpResponse.json(nft)
      : HttpResponse.json({ message: "NFT não encontrado" }, { status: 404 });
  }),
http.get("/api/nfts", async ({ request }) => {
  const scenario = getMockScenario(request);

  if (scenario === "slow") {
    await delay(2500);
  }

  if (scenario === "error") {
    return HttpResponse.json(
      {
        message: "Falha simulada ao carregar o catálogo.",
      },
      { status: 500 },
    );
  }

  const url = new URL(request.url);

    // Simulação determinística de concorrência (somente desenvolvimento).
  if (import.meta.env.DEV) {
  const searchTerm = url.searchParams.get("search")?.toLowerCase();

  if (searchTerm === "emerald") {
    await delay(2000);
  }

  if (searchTerm === "golden") {
    await delay(100);
  }
}

    // Pesquisa
    const search = url.searchParams.get("search")?.trim().toLowerCase();

    // Categorias selecionadas
    const categories = url.searchParams
      .getAll("categories")
      .flatMap((value) => value.split(","))
      .filter(Boolean);

    // Redes selecionadas
    const networks = url.searchParams
      .getAll("networks")
      .flatMap((value) => value.split(","))
      .filter(Boolean);

    const filteredNFTs = mockNFTs.filter((nft) => {
      // Filtro por nome ou coleção
      const matchesSearch =
        !search ||
        nft.name.toLowerCase().includes(search) ||
        nft.collection.toLowerCase().includes(search);

      // Filtro por categoria
      const matchesCategory = categories.length === 0 || categories.includes(nft.category);

      // Filtro por rede
      const matchesNetwork = networks.length === 0 || networks.includes(nft.network);

      return matchesSearch && matchesCategory && matchesNetwork;
    });

    const sort = url.searchParams.get("sort") ?? "recent";

    // Paginação
    const requestedPage = Number(url.searchParams.get("page") ?? "1");
    const requestedLimit = Number(url.searchParams.get("limit") ?? "9");

    const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const limit =
      Number.isSafeInteger(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, 50) : 9;

    const sortedNFTs = [...filteredNFTs].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return toWei(a.priceEth) < toWei(b.priceEth)
            ? -1
            : toWei(a.priceEth) > toWei(b.priceEth)
              ? 1
              : 0;

        case "price-desc":
          return toWei(a.priceEth) > toWei(b.priceEth)
            ? -1
            : toWei(a.priceEth) < toWei(b.priceEth)
              ? 1
              : 0;

        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    // Total de NFTs após aplicar os filtros
    const totalItems = sortedNFTs.length;

    // Quantidade total de páginas
    const totalPages = Math.ceil(totalItems / limit);

    // Índice inicial da página solicitada
    const startIndex = (page - 1) * limit;

    // NFTs pertencentes à página atual
    const paginatedNFTs = sortedNFTs.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      items: paginatedNFTs,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    });
  }),
];
