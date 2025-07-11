"use client";

import { Funnel, Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value && value !== "all") {
      params.set("type", value);
    } else {
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="w-full grid grid-cols-1 grid-flow-row md:grid-cols-2 gap-4">
      <div className="flex w-full items-center justify-center gap-4 md:gap-6 md:col-span-2 ">
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
      </div>
      <div className="flex w-full items-center  gap-4 md:gap-6">
        <label htmlFor="filter-by-type" className="sr-only">
          Filter By Job Type
        </label>
        <Funnel />
        <Select
          onValueChange={handleFilterChange}
          defaultValue={searchParams.get("type") || ""}
        >
          <SelectTrigger className="w-full border-none">
            <SelectValue className="" placeholder="Filter By Type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Job Type</SelectLabel>
              <SelectItem value="all">All Types</SelectItem>
              {["Full-time", "Part-time", "Contract"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div></div>
    </section>
  );
}
