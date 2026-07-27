"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export function PaginationWrapper({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const btnBase = "px-4 py-2 rounded-full text-sm font-light border transition-all";
  const btnInactive = "border-white/10 text-zinc-400 hover:text-white hover:border-primary/50";
  const btnDisabled = "opacity-30 cursor-not-allowed";

  return (
    <div className="flex justify-center items-center gap-2 pt-12 pb-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
      >
        ‹ Previous
      </button>

      {getPageNumbers().map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e-${i}`} className="px-2 text-zinc-600 select-none">...</span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-10 h-10 rounded-full text-sm font-light transition-all ${
              p === currentPage
                ? "bg-primary text-black font-medium"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
      >
        Next ›
      </button>
    </div>
  );
}
