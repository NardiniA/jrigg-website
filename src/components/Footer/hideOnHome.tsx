"use client";

import { Children } from "@/types/children";
import { usePathname } from "next/navigation";

const HideOnHome: React.FC<Children> = ({ children }) => {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "/home";

  if (!isHome) return (
    <>{children}</>
  );

  return null;
}

export default HideOnHome;
