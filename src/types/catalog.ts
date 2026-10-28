import type { NFT, NFTCategory, NFTNetwork } from "./nft";

export type NFTSort = "recent" | "price-asc" | "price-desc";

export interface NFTFilters {
  search?: string;
  categories?: NFTCategory[];
  networks?: NFTNetwork[];
  minPriceEth?: string;
  maxPriceEth?: string;
  sort?: NFTSort;
  page?: number;
  limit?: number;
}

export interface NFTListResponse {
  items: NFT[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
