import { http, HttpResponse } from "msw";

import { mockNFTs } from "./data";

export const handlers = [
  http.get("/api/nfts", ({ request }) => {
    console.log("✅ Handler executado:", request.url);
    const url = new URL(request.url);

    // Pesquisa
    const search = url.searchParams
      .get("search")
      ?.trim()
      .toLowerCase();

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
      const matchesCategory =
        categories.length === 0 ||
        categories.includes(nft.category);

      // Filtro por rede
      const matchesNetwork =
        networks.length === 0 ||
        networks.includes(nft.network);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesNetwork
      );
    });

    const sort = url.searchParams.get("sort") ?? "recent";

const sortedNFTs = [...filteredNFTs].sort((a, b) => {
  switch (sort) {
    case "price-asc":
      return Number(a.priceEth) - Number(b.priceEth);

    case "price-desc":
      return Number(b.priceEth) - Number(a.priceEth);

    case "recent":
    default:
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
  }
});

return HttpResponse.json({
  items: sortedNFTs,
  pagination: {
    page: 1,
    limit: 9,
    totalItems: sortedNFTs.length,
    totalPages: Math.ceil(sortedNFTs.length / 9),
  },
});
  }),
];