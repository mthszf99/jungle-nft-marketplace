import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
      <section className="max-w-xl">
        <p className="mb-4 text-sm text-kurio-primary">
          Bem-vindo à Kurio
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          SEJA DONO DO FUTURO DA ARTE DIGITAL
        </h1>

        <p className="mt-6 text-kurio-muted">
          Descubra NFTs exclusivos de criadores extraordinários.
          Explore coleções digitais e encontre sua próxima obra de arte.
        </p>

        <Button className="mt-8 bg-kurio-primary text-kurio-background hover:bg-kurio-primary-hover">
          Explorar NFTs
        </Button>
      </section>
    </main>
  );
}