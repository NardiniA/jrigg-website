import Image from "next/image";
import { Provider, Slide, Track } from "./Client";
import styles from "./index.module.scss";
import Link from "next/link";
import type { Children } from "@/types/children";

const LinkWrapper: React.FC<{ href?: string; } & Children> = ({ href, children }) => {
  if (!!href) return <Link href={href}>{children}</Link>;

  return <>{children}</>;
}

const Associates: React.FC<{
  section: { header: any; associates: any[] };
  priority: boolean;
}> = ({ section: { associates } }) => {
  if (!!associates?.length) {
    return (
      <section className="section" style={{ overflow: "hidden" }}>
        <Provider
          slidesToShow={2}
          breakpoints={{
            "(min-width: 768px)": {
              slidesToShow: 3,
            },
            "(min-width: 992px)": {
              slidesToShow: 4,
            },
            "(min-width: 1200px)": {
              slidesToShow: 5,
            },
          }}
          marquee={true}
          margueeSpeed={50}
          pauseOnHover={true}
        >
          <Track className={styles["track"]}>
            {associates?.map(({ name, image, url, id }, index) => (
              <Slide index={index} key={id + "_associates_" + index}>
                <article className={styles["slide"]}>
                  {!!image ? (
                    <LinkWrapper href={url}>
                      <Image
                        src={image?.url as string}
                        alt={image?.alt as string}
                        width={150}
                        height={150}
                      />
                    </LinkWrapper>
                  ) : <h4><LinkWrapper href={url}>{name}</LinkWrapper></h4>}
                </article>
              </Slide>
            ))}
          </Track>
        </Provider>
      </section>
    );
  }

  return null;
};

export default Associates;
