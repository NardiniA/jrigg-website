"use client";

import { Children } from "@/types/children";
import { usePathname } from "next/navigation";

const HideOnHomeAndProject: React.FC<Children> = ({ children }) => {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "/home";
  const isProject = pathname?.includes("/gallery/");

  if (!(isHome || isProject)) return (
    <>{children}</>
  );

  return null;
}

export default HideOnHomeAndProject;
