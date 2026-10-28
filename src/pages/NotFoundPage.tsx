import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <main>
      <h1>404 - Página não encontrada</h1>

      <p>A página que você procura não existe.</p>

      <Link to="/">Voltar para o início</Link>
    </main>
  );
}
