import type { GalleryMedia } from "@/app/gallery/[slug]/components/Gallery";
import { Modal, Toggler } from "@/app/gallery/[slug]/components/Client/Modal";
import Image from "next/image";
import styles from "./index.module.scss";
import VideoPlayer from "./VideoPlayer";
import { Media } from "@/types/payload-types";
import { classes } from "@/utilities/classes";
import Nav from "./Nav";

const LightPoster: React.FC<{ poster: Media; alt: string }> = ({ poster, alt }) => {
  return (
    <div style={{ width: "100vw", height: "auto", padding: "0 1.5rem" }}>
      <Image
        src={poster?.url as string}
        alt={alt}
        width={900}
        // @ts-expect-error
        height={(900 / poster?.width) * poster?.height}
        priority={false}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

const Lightbox: React.FC<{
  media: GalleryMedia;
  prev: string | null;
  next: string | null;
}> = ({ media, prev, next }) => {
  return (
    <Modal
      slug={media?.id}
      className={styles["image-modal"]}
      closeOnBlur={false}
    >
      <main>
        {media?.mimeType?.includes("image") ? (
          <Image
            src={media?.url as string}
            alt={media?.alt}
            width={900}
            // @ts-ignore
            height={(900 / media?.width) * media?.height}
            priority={false}
            loading="lazy"
          />
        ) : (
          <VideoPlayer
            url={`${process.env.CLOUDFRONT_MEDIA_URL}/${media?.filename}`}
            controls={true}
            playing={false}
            light={<LightPoster poster={media?.poster} alt={media?.alt} />}
          />
        )}

        <Nav currSlug={media?.id} dirSlug={prev} className={classes(styles["image-modal__nav"], styles["prev"], !prev ? styles["disabled"] : "")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4l-8 8 8 8" /></svg>
        </Nav>
        
        <Toggler className={styles["image-modal__close"]} slug={media?.id}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20L4 4m16 0L4 20" /></svg>
        </Toggler>
        
        <Nav currSlug={media?.id} dirSlug={next} className={classes(styles["image-modal__nav"], styles["next"], !next ? styles["disabled"] : "")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l8 8-8 8" /></svg>
        </Nav>
      </main>
    </Modal>
  );
};

export default Lightbox;
