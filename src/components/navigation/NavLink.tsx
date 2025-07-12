"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function NavLink(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "lg:p-4 uppercase text-[14px] group relative flex items-center gap-4 lg:flex-col lg:gap-0 lg:py-2",
        pathname === props.href && "text-red"
      )}
    />
  );
}
