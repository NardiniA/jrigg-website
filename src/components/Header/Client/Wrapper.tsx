"use client";

import { useMenuContext } from "@/app/Providers/MenuContext";
import { classes } from "@/utilities/classes";
import { Suspense } from "react";
import styles from "../index.module.scss";
import { usePathname } from "next/navigation";
import { Children } from "@/types/children";
import Events from "./Events";

const Wrapper: React.FC<Children> = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home";
  const { open } = useMenuContext();

  return (
    <header className={classes(
      styles["header"],
      open ? styles["show"] : "",
      isHome ? styles["header-home"] : ""
    )}>
      <Suspense fallback={null}><Events /></Suspense>
      {children}
    </header>
  )
}

export default Wrapper;
