export type NFTNetwork = "ethereum" | "polygon" | "solana";

export type NFTCategory =
  | "arte-digital"
  | "fotografia"
  | "musica"
  | "arte-3d"
  | "colecionaveis"
  | "generativa"
  | "jogos"
  | "assinaturas"
  | "utilidade";

export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  priceEth: string;
  network: NFTNetwork;
  category: NFTCategory;
  collection: string;
  edition: string;
  isRare: boolean;
  createdAt: string;
}