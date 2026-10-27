import { Link } from "@tanstack/react-router";

export function CartPage() {
  return (
    <main>
      <h1>Meu Carrinho</h1>

      <p>Seu carrinho está vazio.</p>

      <Link to="/">
        Voltar para o início
      </Link>
    </main>
  );
}