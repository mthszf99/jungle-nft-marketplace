import { useNavigate, useSearch } from "@tanstack/react-router";
import type { NFTCategory, NFTNetwork } from "../../types/nft";

const categories: { label: string; value: NFTCategory }[] = [
  { label: "Arte Digital", value: "arte-digital" },
  { label: "Fotografia", value: "fotografia" },
  { label: "Música", value: "musica" },
  { label: "Arte 3D", value: "arte-3d" },
  { label: "Colecionáveis", value: "colecionaveis" },
  { label: "Arte Generativa", value: "generativa" },
  { label: "Jogos", value: "jogos" },
  { label: "Assinaturas", value: "assinaturas" },
  { label: "Utilidade", value: "utilidade" },
];

const networks: { label: string; value: NFTNetwork }[] = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Polygon", value: "polygon" },
  { label: "Solana", value: "solana" },
];

export function NFTFilters() {
  const navigate = useNavigate({ from: "/" });
  const { categories: selectedCategories = [], networks: selectedNetworks = [] } =
    useSearch({ from: "/" });

  function toggleCategory(category: NFTCategory) {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    void navigate({
      search: (previous) => ({
        ...previous,
        categories: updatedCategories.length
          ? updatedCategories
          : undefined,
      }),
      replace: true,
    });
  }

  function toggleNetwork(network: NFTNetwork) {
    const updatedNetworks = selectedNetworks.includes(network)
      ? selectedNetworks.filter((item) => item !== network)
      : [...selectedNetworks, network];

    void navigate({
      search: (previous) => ({
        ...previous,
        networks: updatedNetworks.length
          ? updatedNetworks
          : undefined,
      }),
      replace: true,
    });
  }

  function clearFilters() {
    void navigate({
      search: (previous) => ({
        ...previous,
        categories: undefined,
        networks: undefined,
      }),
      replace: true,
    });
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedNetworks.length > 0;

  return (
    <aside className="space-y-6 rounded-2xl border border-kurio-border bg-kurio-surface p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-kurio-text">
          Filtros
        </h3>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer text-xs text-kurio-primary hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-kurio-text">
          Categorias
        </legend>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-kurio-muted transition-colors hover:text-kurio-text"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.value)}
                onChange={() => toggleCategory(category.value)}
                className="h-4 w-4 accent-kurio-primary"
              />

              {category.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-t border-kurio-border" />

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-kurio-text">
          Blockchain
        </legend>

        <div className="space-y-3">
          {networks.map((network) => (
            <label
              key={network.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-kurio-muted transition-colors hover:text-kurio-text"
            >
              <input
                type="checkbox"
                checked={selectedNetworks.includes(network.value)}
                onChange={() => toggleNetwork(network.value)}
                className="h-4 w-4 accent-kurio-primary"
              />

              {network.label}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}