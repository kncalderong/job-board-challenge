import { HomeIcon, LucideIcon, PlusIcon } from "lucide-react";

export type NavLinkType = {
  id: number;
  text: string;
  path: string;
  icon: LucideIcon;
};

const links: NavLinkType[] = [
  { id: 1, text: "home", path: "/", icon: HomeIcon },
  { id: 3, text: "Post Job", path: "/create", icon: PlusIcon },
];

export default links;
