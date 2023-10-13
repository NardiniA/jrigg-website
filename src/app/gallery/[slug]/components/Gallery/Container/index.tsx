import { Toggler } from "../../Client/Modal";
import styles from "../index.module.scss";
import { classes } from "@/utilities/classes";
import Image from "next/image";
import { GalleryMedia } from "..";

export type ContainerProps = {
  showProjectTitle?: boolean;
  media: GalleryMedia[];
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({
  showProjectTitle = false,
  media,
  children,
}) => {
  const MediaTitle = ({ med, children }: { med: GalleryMedia, children: React.ReactNode }) => {
    if (showProjectTitle && med?.project) {
      const title = typeof med?.project === "object" ? med?.project?.name : med?.project;

      return (
        <span>{title} - {children}</span>
      );
    }

    return <span>{children}</span>
  }

  if (!!media?.length)
    return (
      <main className={styles["gallery__container"]}>
        <header
          className={styles["gallery__header"]}
          style={{ display: !children ? "none" : undefined }}
        >
          {children}
        </header>

        <main className={classes(styles["gallery__grid"], "content")}>
          {media?.map((m, idx) => (
              <div className={styles["gallery__column"]}>
                <Toggler
                  slug={m?.id}
                  htmlElement="article"
                  key={m?.id + "_media_key_" + idx}
                  className={styles["gallery__item"]}
                >
                  <div className={styles["gallery__item-image"]}>
                    <Image
                      src={(m?.mimeType?.includes("video") ? m?.poster?.url : m?.url) as string}
                      alt={m?.alt as string}
                      placeholder={!!(m?.poster?.placeholder || m?.placeholder) ? "blur" : undefined}
                      blurDataURL={`data:image/${m?.poster?.placeholder || m?.placeholder}`}
                      width={200}
                      height={150}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles["gallery__item-data"]}>
                    <MediaTitle med={m}>
                      {m?.title || m?.alt}
                    </MediaTitle>
                  </div>
                </Toggler>
              </div>
            )
          )}
        </main>
      </main>
    );

  return null;
};

export default Container;
