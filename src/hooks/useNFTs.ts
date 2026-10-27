import { useQuery } from "@tanstack/react-query";

import { getNFTs } from "../services/nfts";
import type { NFTFilters } from "../types/catalog";

export function useNFTs(filters: NFTFilters = {}) {
  return useQuery({
    queryKey: ["nfts", filters],
    queryFn: () => getNFTs(filters),
    staleTime: 1000 * 60,
  });
}