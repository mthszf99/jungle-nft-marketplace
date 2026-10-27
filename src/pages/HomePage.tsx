import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-4xl font-bold text-purple-400">
        Jungle NFT Marketplace
      </h1>

      <p className="mt-4 text-lg">
        Explore e descubra NFTs exclusivos.
      </p>

      <Button
        className="mt-6"
        render={<Link to="/carrinho" />}
      >
        Acessar carrinho
      </Button>
    </main>
  );
}