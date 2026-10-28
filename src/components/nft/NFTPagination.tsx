import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NFTPaginationProps {
  totalPages: number;
}

export function NFTPagination({ totalPages }: NFTPaginationProps) {
  const navigate = useNavigate({ from: "/" });

  const { page = 1 } = useSearch({ from: "/" });

  if (totalPages <= 1) {
    return null;
  }

  function goToPage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    void navigate({
      search: (previous) => ({
        ...previous,
        page: newPage === 1 ? undefined : newPage,
      }),
      replace: true,
    });
  }

  return (
    <nav
      aria-label="Paginação dos NFTs"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-kurio-border bg-kurio-surface text-kurio-text transition-colors hover:border-kurio-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
        const isActive = pageNumber === page;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => goToPage(pageNumber)}
            aria-label={`Ir para página ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors ${
              isActive
                ? "border-kurio-primary bg-kurio-primary text-kurio-background"
                : "border-kurio-border bg-kurio-surface text-kurio-text hover:border-kurio-primary"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        aria-label="Próxima página"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-kurio-border bg-kurio-surface text-kurio-text transition-colors hover:border-kurio-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
