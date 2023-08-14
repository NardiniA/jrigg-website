import Link from "next/link";
import styles from "./social.module.scss";
import { Setting } from "@/types/payload-types";

const Social: React.FC<{ social: Setting["social"]["social"] }> = ({ social }) => (
  <footer className={styles["header-social"]}>
    {social?.map(({ name, url, icons, id }, j ) => (
      <Link href={url} key={id || "header_social" + j}>
        <span className="screen-reader-text">{name}</span>
        <i className={`bx ${icons}`}></i>
      </Link>
    ))}
  </footer>
);

export default Social;
