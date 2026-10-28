import { api } from "./api";

import type { NFTFilters, NFTListResponse } from "../types/catalog";

export async function getNFTs(filters: NFTFilters = {}): Promise<NFTListResponse> {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  filters.categories?.forEach((category) => {
    params.append("categories", category);
  });

  filters.networks?.forEach((network) => {
    params.append("networks", network);
  });

  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  if (filters.page) {
    params.set("page", String(filters.page));
  }

  if (filters.limit) {
    params.set("limit", String(filters.limit));
  }

  const response = await api.get<NFTListResponse>("/nfts", {
    params,
  });

  return response.data;
}
