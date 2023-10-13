import { GalleryMedia } from "..";
import { Modal, Toggler } from "../../Client/Modal";
import Image from "next/image";
import styles from "../index.module.scss";
import VideoPlayer from "./VideoPlayer";
import { Media } from "@/types/payload-types";

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
  showProjectTitle?: boolean;
}> = ({ media, showProjectTitle = false }) => {
  const ProjectTitle = ({ children }: { children: React.ReactNode }) => {
    if (showProjectTitle && media?.project) {
      const proj =
        typeof media?.project === "object"
          ? media?.project?.name
          : media?.project;

      return (
        <span>
          {proj} - {children}
        </span>
      );
    }

    return <span>{children}</span>;
  };

  return (
    <Modal
      slug={media?.id}
      className={styles["image-modal"]}
      closeOnBlur={false}
    >
      <main>
        {media?.title ? <ProjectTitle>{media?.title}</ProjectTitle> : null}

        {media?.mimeType?.includes("image") ? (
          <Image
            src={media?.url as string}
            alt={media?.alt}
            width={900}
            // @ts-expect-error
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

        <Toggler slug={media?.id}>Close</Toggler>
      </main>
    </Modal>
  );
};

export default Lightbox;
