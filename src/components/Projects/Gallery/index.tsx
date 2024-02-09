"use client";

import type { GalleryMedia } from "@/types/media";
import styles from "./index.module.scss";
import Image from "next/image";
import Toggler from "./Toggler";

import "yet-another-react-lightbox/styles.css";
import Lightbox, { Slide, SlideVideo } from "yet-another-react-lightbox";
import { Fullscreen, Slideshow, Video } from "yet-another-react-lightbox/plugins";
import { useState } from "react";

const Gallery: React.FC<{ media: GalleryMedia[] }> = ({ media }) => {
  const [index, setIndex] = useState(-1);
  
  if (!media?.length) return null;

  // @ts-expect-error
  const lightboxMedia: (Slide | SlideVideo)[] = media?.map((m) => {
    if (m?.mimeType?.includes("video")) {
      return {
        type: "video",
        poster: m?.poster?.url,
        width: m?.width,
        height: m?.height,
        autoPlay: true,
        controls: true,
        sources: [
          {
            src: m?.url,
            type: m?.mimeType,
          },
        ],
      }
    }

    return {
      type: "image",
      src: m?.url,
      width: m?.width,
      height: m?.height,
    }
  })

  return (
    <>
      <div className={styles["image-gallery"]}>
        {media?.map((m, idx) => (
          <Toggler className={styles["image-gallery_item"]} index={idx} setIndex={setIndex} key={m?.id + "_proj_toggler_" + idx}>
            <Image
              src={m?.poster?.url || m?.url as string}
              alt={m?.alt}
              sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
              placeholder={(m?.poster?.placeholder || m?.placeholder) ? "blur" : "empty"}
              blurDataURL={m?.poster?.placeholder || m?.placeholder || undefined}
              fill
            />
          </Toggler>
        ))}
      </div>

      <Lightbox
        slides={lightboxMedia}
        open={index >= 0}
        index={index}
        carousel={{
          finite: lightboxMedia?.length === 1,
        }}
        close={() => setIndex(-1)}
        // render={{
        //   slide: NextImage,
        // }}
        plugins={[Fullscreen, Slideshow, Video]}
      />
    </>
  )
}

export default Gallery