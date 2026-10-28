import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, X } from "lucide-react";

interface SearchFormProps {
  initialSearch: string;
}

function SearchForm({ initialSearch }: SearchFormProps) {
  const navigate = useNavigate({ from: "/" });
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    void navigate({
      search: (previous) => ({
        ...previous,
        search: searchTerm.trim() || undefined,
        page: undefined,
      }),
      replace: true,
    });
  }

  function handleClear() {
    setSearchTerm("");

    void navigate({
      search: (previous) => ({
        ...previous,
        search: undefined,
        page: undefined,
      }),
      replace: true,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative flex w-full max-w-md items-center"
    >
      <Search
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 text-kurio-muted"
      />

      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Buscar NFTs..."
        aria-label="Buscar NFTs"
        className="w-full rounded-xl border border-kurio-border bg-kurio-surface py-3 pr-24 pl-12 text-sm text-kurio-text outline-none transition-colors placeholder:text-kurio-muted focus:border-kurio-primary"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpar pesquisa"
          className="absolute right-16 cursor-pointer text-kurio-muted hover:text-kurio-text"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        aria-label="Pesquisar"
        className="absolute right-2 cursor-pointer rounded-lg bg-kurio-primary px-3 py-2 text-xs font-semibold text-kurio-background hover:bg-kurio-primary-hover"
      >
        Buscar
      </button>
    </form>
  );
}

export function NFTSearch() {
  const { search = "" } = useSearch({ from: "/" });

  return <SearchForm key={search} initialSearch={search} />;
}
