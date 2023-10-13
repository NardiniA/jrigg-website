import { Fragment } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { classes } from "@/utilities/classes";
import { Page } from "@/types/payload-types";
import RichText from "@/components/RichText";
import { Children } from "@/components/RichText/serialise";

type BannerProps = {
  hero: Page["hero"]["banner"];
  breadcrumbs?: Page["breadcrumbs"];
}

const Banner: React.FC<BannerProps> = ({ hero, breadcrumbs }) => {
  if (!!hero) return (
    <section className={styles["banner"]}>
      <div className={classes("row", styles["banner__content"])}>
        <div className={styles["banner__content-inner"]}>
          <div className={styles["banner__content-left"]}>
            {hero?.title && (
              <h1 className={styles["banner_-content-title"]}>{hero?.title}</h1>
            )}
            {!!breadcrumbs?.length && (
              <div className={styles["breadcrumbs"]}>
                <Link href="/">Home</Link>
                <span className={styles["separator"]}>/</span>
                {breadcrumbs?.map(({ label, url, id }: any, idx: number) => {
                  const isLast = breadcrumbs.length - 1 === idx;

                  if (label === "Home" || url === "/home") return null;
                  if (isLast)
                    return (
                      <span className={styles["disabled"]} key={id}>
                        {label}
                      </span>
                    );

                  return (
                    <Fragment key={id}>
                      <Link href={url}>{label}</Link>
                      <span className={styles["separator"]}>/</span>
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>
          <div className={styles["banner__content-right"]}>
            <RichText className={styles["banner__content-desc"]} content={hero?.description as Children} inline />
          </div>
        </div>
      </div>
    </section>
  );

  return null;
}

export default Banner;
