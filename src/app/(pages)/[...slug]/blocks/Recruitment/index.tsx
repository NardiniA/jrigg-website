import styles from "./index.module.scss";
import Link from "next/link";
import { classes } from "@/utilities/classes";
import Transport from "@/lib/transport";
import { Page, Recruitment } from "@/types/payload-types";
import { Query } from "@/types/where";

const Recruitment: React.FC<{
  section: { type: "automatic" | "manual"; manual: Recruitment[] };
  breadcrumbs?: Page["breadcrumbs"];
  priority: boolean;
}> = async ({ section: { type, manual } }) => {
  const query: Query =
    type === "automatic"
      ? { limit: 100_000 }
      : {
          where: {
            id: {
              in: manual?.map(({ id }: { id: string }) => id),
            },
          },
          limit: 100_000,
        };

  const transport = new Transport({
    collection: "recruitment",
    query: query,
  });

  const jobs: Recruitment[] = (await transport.get({ draftable: true, options: { next: { tags: ["recruitment"] } } })).value(
    "docs"
  );

  if (!!jobs?.length)
    return (
      <section className="section">
        <div className="container">
          <div className={classes("row", styles["recruitment-row"])} id="recruitment-row">
            {jobs?.map(({ title, description, slug, id }: any, idx: number) => {
              const href = `/recruitment/${slug}`;

              return (
                <div className={styles["recruitment-col"]} key={id + "recruitment_card" + idx}>
                  <article className={styles["recruitment-card"]} data-aos="fade-up" data-aos-delay={String(200 * (idx + 1))} data-aos-anchor="#recruitment-row">
                    {title && (
                      <h2 className="h3">
                        <Link href={href}>{title}</Link>
                      </h2>
                    )}
                    {description && <p>{description}</p>}
                    <footer className={styles["recruitment-card-footer"]}>
                      <Link href={href}>
                        View Job <i className="bx bx-right-arrow-alt"></i>
                      </Link>
                    </footer>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );

  return (
    <section className="section">
      <div className="container"></div>
    </section>
  );
};

export default Recruitment;
