"use client";

import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBlock({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <section className="w-full flex items-center justify-center gap-4 md:gap-6">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Search />
      <input
        type="search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="min-h-[24px] bg-dark-blue text-white flex-grow focus-visible:bg-dark-blue focus-visible:border-b-[1px] focus-visible:border-b-greyish-blue caret-red focus-visible:outline-none cursor-pointer text-base md:text-2xl"
        placeholder={placeholder}
        defaultValue={searchParams.get("query") || ""}
      />
    </section>
  );
}
