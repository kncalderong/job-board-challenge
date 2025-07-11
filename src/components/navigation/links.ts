import {
  CpuIcon,
  EarthIcon,
  HeartPulseIcon,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

export type NavLinkType = {
  id: number;
  text: string;
  path: string;
  icon: LucideIcon;
};

const links: NavLinkType[] = [
  { id: 1, text: "home", path: "/", icon: HomeIcon },
  { id: 3, text: "technology", path: "/technology", icon: CpuIcon },
  { id: 4, text: "health", path: "/health", icon: HeartPulseIcon },
  { id: 2, text: "public", path: "/public", icon: EarthIcon },
];

export default links;
