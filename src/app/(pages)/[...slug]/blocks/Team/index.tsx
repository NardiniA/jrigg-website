import SectionHeader from "@/components/SectionHeader";
import styles from "./index.module.scss";
import Image from "next/image";
import { Page } from "@/types/payload-types";

const Team: React.FC<{ section: any; breadcrumbs?: Page["breadcrumbs"]; priority: boolean; }> = async ({
  section: { header, members },
  priority
}) => {
  if (!!members?.length)
    return (
      <section className="section">
        <div className="container">
          <div className="row" id="team-row">
            {!!header && <SectionHeader header={header} />}
            {members?.map(
              async ({ name, position, image, id }: any, idx: number) => (
                <article className={styles["member-col"]} data-aos="fade-up" data-aos-delay={String(200 * (idx + 1))} data-aos-anchor="#team-row" key={id + idx}>
                  <div className={styles["member"]}>
                    {!!image && (
                      <div className={styles["member-image-wrapper"]}>
                        <div className={styles["member-image"]}>
                          <Image
                            src={image?.url as string}
                            alt={image?.alt as string}
                            width={150}
                            height={150}
                            placeholder={
                              !!image?.placeholder ? "blur" : undefined
                            }
                            priority={priority}
                            blurDataURL={`data:image/${image?.placeholder}`}
                          />
                        </div>
                      </div>
                    )}
                    <div className={styles["member-info"]}>
                      {name && <h4 className="h5">{name}</h4>}
                      {position && <h6>{position}</h6>}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>
    );

  return null;
};

export default Team;
