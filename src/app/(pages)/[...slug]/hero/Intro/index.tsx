"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { classes } from "@/utilities/classes";
import { Media, Page } from "@/types/payload-types";
import { loader } from "@/lib/loader";

const Intro: React.FC<{
  hero: Page["hero"]["intro"];
  breadcrumbs: Page["breadcrumbs"];
}> = ({ hero, breadcrumbs }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slider = hero?.slider;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!!slider?.length && activeSlide === slider.length - 1) {
        setActiveSlide(0);
      } else setActiveSlide(activeSlide + 1);
    }, 7500);

    return () => clearTimeout(timer);
  }, [activeSlide, slider?.length]);

  if (!hero) return null;

  if (slider?.length)
    return (
      <header className={styles["intro-container"]}>
        {slider?.map(({ media }, i) => {
          const image = media as Media;
          return (
            <div
              className={classes(
                styles["intro-slide"],
                activeSlide === i ? styles["active"] : ""
              )}
              key={image?.id || "intro_media" + i}
            >
              <div className={styles["slide__container"]}>
                <Image
                  src={image?.url as string}
                  alt={image?.alt}
                  priority={i === 0}
                  quality={100}
                  placeholder={!!image?.placeholder ? "blur" : undefined}
                  blurDataURL={`data:image/${image?.placeholder}`}
                  fill
                />
              </div>
            </div>
          );
        })}
        <div className={styles["dot-container"]}>
          {slider?.map(({ id }, j ) => (
            <button
              key={id + "_pgn_" + j}
              className={classes(
                styles["dot"],
                activeSlide === j ? styles["dotIsActive"] : "",
              )}
              onClick={(e) => {
                setActiveSlide(j);
              }}
            >
              {j + 1}
            </button>
          ))}
        </div>
      </header>
    );

  return null;
};

export default Intro;
