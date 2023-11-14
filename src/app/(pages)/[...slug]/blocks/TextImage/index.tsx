import { classes } from "@/utilities/classes";
import styles from "./index.module.scss";
import RichText from "@/components/RichText";
import Image from "next/image";

const TextImage: React.FC<{ section: any, priority: boolean }> = async ({ section, priority }) => {

  return (
    <section
      className={classes(
        "section",
        styles["text__image"],
        section?.reversed ? styles["reversed"] : ""
      )}
    >
      <div className="container">
        <div className={classes("row", styles["text__image-row"])}>
          {!!section?.text?.length && (
            <div
              className={classes(
                styles["text__image-col"],
                styles["text__image-text"]
              )}
            >
              <div data-aos={section?.reversed ? "fade-left" : "fade-right"}>
                <RichText
                  content={section?.text}
                  className={styles["text__image-content"]}
                />
              </div>
            </div>
          )}
          {!!section?.image?.url && (
            <div
              className={classes(
                styles["text__image-col"],
                styles["text__image-image"]
              )}
            >
              <div data-aos={section?.reversed ? "fade-right" : "fade-left"}>
                <Image
                  src={section?.image?.url as string}
                  alt={section?.image?.alt as string}
                  width={500}
                  height={(500 / section?.image?.width) * section?.image?.height as number}
                  priority={priority}
                  placeholder={
                    !!section?.image?.placeholder ? "blur" : undefined
                  }
                  blurDataURL={`data:image/${section?.image?.placeholder}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextImage;
