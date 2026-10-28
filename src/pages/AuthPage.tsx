import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMarketplace } from "../state/MarketplaceProvider";
export function AuthPage({ mode }: { mode: "login" | "cadastro" }) {
  const { signIn } = useMarketplace();
  const navigate = useNavigate();
  const redirect = useRouterState({
    select: (s) => new URLSearchParams(s.location.searchStr.replace(/^\?/, "")).get("redirect"),
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password.trim() || (mode === "cadastro" && !name.trim())) return;
    signIn(name.trim() || email.split("@")[0], email.trim());
    void navigate({ to: redirect === "/checkout" ? "/checkout" : "/perfil" });
  }
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <form
        onSubmit={submit}
        className="space-y-5 rounded-3xl border border-kurio-border bg-kurio-surface p-8"
      >
        <h1 className="text-3xl font-bold">{mode === "login" ? "Entrar" : "Criar conta"}</h1>
        <p className="text-sm text-kurio-muted">
          Acesso demonstrativo para explorar o marketplace.
        </p>
        {mode === "cadastro" && (
          <label className="block text-sm">
            Nome
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-kurio-border bg-kurio-background p-3"
            />
          </label>
        )}
        <label className="block text-sm">
          E-mail
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-kurio-border bg-kurio-background p-3"
          />
        </label>
        <label className="block text-sm">
          Senha
          <input
            required
            minLength={6}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-kurio-border bg-kurio-background p-3"
          />
        </label>
        <button className="w-full rounded-xl bg-kurio-primary p-3 font-bold text-kurio-background">
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
        <p className="text-center text-sm text-kurio-muted">
          {mode === "login" ? "Não tem conta? " : "Já tem conta? "}
          <Link to={mode === "login" ? "/cadastro" : "/login"} className="text-kurio-primary">
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </Link>
        </p>
        <p className="text-xs text-kurio-muted">
          Demo: os dados não são enviados a um servidor. Não use senhas reais.
        </p>
      </form>
    </main>
  );
}
