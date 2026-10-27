import type { NFT } from "@/types/nft";

export const mockNFTs: NFT[] = [
  {
    id: "nft-001",
    tokenId: "0042",
    name: "Emerald Ape #042",
    description:
      "Um colecionável digital da coleção Kurio Apes, verificado na Ethereum.",
    imageUrl: "/images/nfts/emerald-ape.png",
    priceEth: "1.19",
    network: "ethereum",
    category: "colecionaveis",
    collection: "Kurio Apes",
    edition: "1/50",
    isRare: false,
    createdAt: "2026-07-29T12:00:00Z",
  },
  {
    id: "nft-002",
    tokenId: "0009",
    name: "Sage Nomad #009",
    description:
      "Um colecionável digital exclusivo da coleção Kurio Apes.",
    imageUrl: "/images/nfts/sage-nomad.png",
    priceEth: "1.69",
    network: "ethereum",
    category: "arte-digital",
    collection: "Kurio Apes",
    edition: "1/10",
    isRare: false,
    createdAt: "2026-07-28T12:00:00Z",
  },
  {
    id: "nft-003",
    tokenId: "0552",
    name: "Neon Vessel #552",
    description:
      "NFT raro da coleção Kurio Apes.",
    imageUrl: "/images/nfts/neon-vessel.png",
    priceEth: "1.99",
    network: "polygon",
    category: "colecionaveis",
    collection: "Kurio Apes",
    edition: "1/50",
    isRare: true,
    createdAt: "2026-07-27T12:00:00Z",
  },
];