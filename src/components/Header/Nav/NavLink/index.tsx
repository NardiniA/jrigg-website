import Link from "next/link";
import { parseLink } from "@/utilities/parseLink";
import styles from "../index.module.scss";
import { NavTypes } from "../types";

const NavLink: React.FC<{
  item: NavTypes;
}> = ({ item: { label, link } }) => {
  const href = parseLink(link);

  if (!!href)
    return (
      <li className={styles["nav-item"]}>
        <Link href={href} className={styles["nav-link"]}>
          {label}
        </Link>
      </li>
    );

  return null;
};

export default NavLink;
