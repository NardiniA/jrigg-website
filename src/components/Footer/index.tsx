import styles from "./index.module.scss";
import Link from "next/link";
import HideOnHomeAndProject from "./hideOnHomeAndProject";

const Footer: React.FC = () => (
  <HideOnHomeAndProject>
    <footer className={styles["footer"]}>
      <Link href="https://antonionardini.com" className={styles["footer-link"]}>
        Antonio Nardini
      </Link>

      <span className={styles["footer-copy"]}>
        © {new Date().toLocaleString("en-GB", { year: "numeric" })} J. Rigg
        Construction
      </span>

      <div style={{ textAlign: "center" }}>
        <Link href="/privacy" className={styles["footer-link"]}>
          Privacy Policy
        </Link>
        <Link href="/terms" className={styles["footer-link"]}>
          Terms of Use
        </Link>
      </div>
    </footer>
  </HideOnHomeAndProject>
);

export default Footer;
