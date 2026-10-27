import { Link } from "@tanstack/react-router";

export function HomePage() {
  return (
    <main>
      <h1>Jungle NFT Marketplace</h1>

      <p>Explore e descubra NFTs exclusivos.</p>

      <Link to="/carrinho">
        Acessar carrinho
      </Link>
    </main>
  );
}