import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowDownUp } from "lucide-react";

import type { NFTSort as NFTSortType } from "../../types/catalog";

const sortOptions: { label: string; value: NFTSortType }[] = [
  { label: "Mais recentes", value: "recent" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
];

export function NFTSort() {
  const navigate = useNavigate({ from: "/" });

  const { sort = "recent" } = useSearch({ from: "/" });

  function handleSortChange(value: NFTSortType) {
    void navigate({
      search: (previous) => ({
        ...previous,
        sort: value === "recent" ? undefined : value,
        page: undefined,
      }),
      replace: true,
    });
  }

  return (
    <div className="flex items-center gap-3">
      <ArrowDownUp size={18} aria-hidden="true" className="shrink-0 text-kurio-muted" />

      <label htmlFor="nft-sort" className="whitespace-nowrap text-sm text-kurio-muted">
        Ordenar por:
      </label>

      <select
        id="nft-sort"
        value={sort}
        onChange={(event) => handleSortChange(event.target.value as NFTSortType)}
        className="cursor-pointer rounded-xl border border-kurio-border bg-kurio-surface px-4 py-3 text-sm text-kurio-text outline-none transition-colors focus:border-kurio-primary"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
