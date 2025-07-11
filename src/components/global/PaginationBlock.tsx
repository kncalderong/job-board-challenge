"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { cn, generatePagination } from "@/lib/utils";

export default function PaginationBlock({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination className="">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={cn(
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined,
              "tracking-widest uppercase hover:bg-transparent hover:text-orange-light"
            )}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          return (
            <PaginationItem key={`${page}-${index}`}>
              {page === "..." ? (
                <PaginationEllipsis className="text-gray-light" />
              ) : (
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={page === currentPage}
                  className={cn(page === currentPage && "text-dark-blue")}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={cn(
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined,
              "tracking-widest uppercase hover:bg-transparent hover:text-orange-light"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
