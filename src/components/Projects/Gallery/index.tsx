import { GalleryMedia } from "@/app/gallery/[slug]/components/Gallery"
import styles from "./index.module.scss";
import Image from "next/image";
import { Container, Provider, Toggler } from "@/app/gallery/[slug]/components/Client/Modal";
import Lightbox from "./Lightbox";

const Gallery: React.FC<{ media: GalleryMedia[] }> = ({ media }) => {
  if (!media?.length) return null;

  return (
    <Provider transTime={400}>
      <div className={styles["image-gallery"]}>
        {media?.map((m, idx) => (
          <Toggler slug={m?.id} className={styles["image-gallery_item"]} key={m?.id + "_proj_gal_" + idx}>
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

      <Container>
        {media?.map((m, idx) => {
          return (
            <Lightbox
              media={m}
              key={m?.id + "_modal_" + idx}
              prev={idx !== 0 ? media[idx - 1]?.id : null}
              next={(media?.length - 1) !== idx ? media[idx + 1]?.id : null}
            />
          )
        })}
      </Container>
    </Provider>
  )
}

export default Gallery