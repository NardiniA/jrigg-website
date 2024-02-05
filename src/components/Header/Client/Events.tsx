"use client";

import { useMenuContext } from "@/app/Providers/MenuContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Events: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { open, setOpen } = useMenuContext();

  const closeMenu = () => {
    if (open) setOpen(false);
    return;
  }

  useEffect(() => {
    closeMenu();
    document.body.classList.remove("overflow-hidden");
    window.addEventListener("resize", closeMenu);

    return () => {
      closeMenu();
      window.removeEventListener("resize", closeMenu);
    }
  }, [pathname, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default Events;
