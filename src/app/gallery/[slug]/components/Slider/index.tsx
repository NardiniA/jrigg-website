import type { Media, Project } from "@/types/payload-types";
import { Provider, Track, Slide, Pgn } from "../Client/Slider";
import Image from "next/image";
import styles from "./index.module.scss";
import RichText from "@/components/RichText";
import { classes } from "@/utilities/classes";
import { Toggler } from "../Client/Modal";

const Slider: React.FC<{ featured: Project["gallery"]["gallery"] }> = ({
  featured,
}) => {
  if (!!featured?.length)
    return (
      <section className={styles["slider"]}>
        <Provider slidesToShow={1} scrollable={false} dragScroll={false}>
          <Track className={styles["track"]}>
            {featured?.map((feat, idx) => {
              const media: Media = feat?.media as Media;
              const poster: Media = media?.poster as Media;

              return (
                <Slide index={idx} key={feat?.id + "_featured_slider_" + idx}>
                  <main className={styles["slide"]}>
                    <div
                      className={classes(
                        styles["slide-image"],
                        feat?.info === "sidebar"
                          ? styles["slide-image-sidebar"]
                          : ""
                      )}
                    >
                      <Image
                        src={(poster?.url || media?.url) as string}
                        alt={media?.alt as string}
                        priority={idx === 0}
                        quality={100}
                        placeholder={media?.placeholder ? "blur" : undefined}
                        blurDataURL={`data:image/${media?.placeholder}`}
                        sizes="(max-width: 449px) 33vw,
                              (min-width: 450px) 50vw,
                              (min-width: 768px) 75vw,
                              (min-width: 1200px) 100vw"
                        fill
                      />

                      {media?.mimeType?.includes("video") ? <Toggler className={styles["slide-video-button"]} slug={media?.id}>
                        <i className="bx bx-play"></i>
                      </Toggler> : null}
                    </div>
                    {feat?.info !== "none" && (
                      <div className={styles[`slide-${feat?.info}`]}>
                        <RichText
                          content={feat[feat?.info]}
                          inline={feat?.info === "caption"}
                          className={styles["slide-content"]}
                        />
                      </div>
                    )}
                  </main>
                </Slide>
              );
            })}
          </Track>
          <Pgn
            className={styles["dot-container"]}
            dotClassName={styles["dot"]}
            activeDotClassName={styles["dotIsActive"]}
          />
        </Provider>
      </section>
    );

  return null;
};

export default Slider;
