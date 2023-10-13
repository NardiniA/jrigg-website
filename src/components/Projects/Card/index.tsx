import styles from "./index.module.scss";
import Link from "next/link";
import { classes } from "@/utilities/classes";
import { truncateString } from "@/utilities/truncateString";
import { Media, Project } from "@/types/payload-types";
import Image from "next/image";

type ProjectCard = {
  card: {
    details: {
      thumbnail: {
        poster?: Media;
      } & Media
    }
  } & Project;
  index: number;
  last: boolean;
}

const Card: React.FC<ProjectCard> = ({ card: { name, slug, details: { description, thumbnail } }, index, last }) => {
  const href = `/gallery/${slug}`;

  return (
    <>
      <article
        className={classes(
          styles["project"],
          index % 2 === 0 ? "" : styles["left"]
        )}
      >
        <div className={styles["project-image"]}>
          <Image
            src={thumbnail?.url as string}
            alt={thumbnail?.alt}
            priority={index === 0}
            quality={100}
            placeholder={!!thumbnail?.placeholder ? "blur" : undefined}
            blurDataURL={`data:image/${thumbnail?.placeholder}`}
            sizes="(max-width: 499px) 33vw,
                  (min-width: 500px) 50vw,
                  (min-width: 1200px) 100vw"
            fill
          />
        </div>

        <div className={styles["project-info"]}>
          <div className={styles["project-box"]}>
            <div className={styles["project-text"]}>
              {name && (
                <h3>
                  <Link href={href}>{name}</Link>
                </h3>
              )}
              {description && <p>{truncateString(description)}</p>}
            </div>
            <footer className={styles["project-footer"]}>
              <Link href={href}>
                <span className={styles["project-footer-icon"]}></span>
                <span className={styles["project-footer-text"]}>
                  View Project
                </span>
              </Link>
            </footer>
          </div>
        </div>
      </article>
      <div
        className={classes(styles["separator"], last ? styles["isLast"] : "")}
      ></div>
    </>
  );
}

export default Card;
