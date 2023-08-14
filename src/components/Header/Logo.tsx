import Link from "next/link";
import styles from "./logo.module.scss";
import { Setting } from "@/types/payload-types";

const Logo: React.FC<{ image: Setting["logo"] }> = ({ image }) => {
  const url = typeof image === "string" ? image : image?.url;
  
  const inline: React.CSSProperties = {
    backgroundImage: `url(${url})`,
  }

  if (url) return (
    <Link href="/" className={styles["header-logo"]} style={inline}>
      <span className="screen-reader-text">J. Rigg Home</span>
    </Link>
  );

  return null;
};

export default Logo;
