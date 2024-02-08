"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.scss";

const HeaderLink: React.FC<{
  href: string;
  categorySlug?: string;
  projectSlug?: string;
  children: React.ReactNode;
}> = ({ href, projectSlug, categorySlug, children, ...rest }) => {
  const pathname = usePathname();
  const isActive = (categorySlug && pathname?.includes(categorySlug)) || projectSlug && pathname === projectSlug;

  return (
    <Link href={href} className={isActive ? styles["active"] : undefined} {...rest}>
      {children}
    </Link>
  )
}

export default HeaderLink