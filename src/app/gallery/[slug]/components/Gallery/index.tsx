import type { Media, Project } from "@/types/payload-types";
import { Container, Modal, Toggler } from "../Client/Modal";
import { default as GalleryContainer } from "./Container";
import styles from "./index.module.scss";
import Transport from "@/lib/transport";
import Lightbox from "./Lightbox";

export type GalleryMedia = {
  poster: Media;
} & Media;

const Gallery: React.FC<{ project: Project }> = async ({ project }) => {
  const transport = new Transport({
    collection: "media",
    query: {
      where: {
        project: {
          equals: project?.id,
        },
      },
      limit: 100_000,
      sort: "filename",
    },
  });

  const media: GalleryMedia[] = await(
    await transport.get({
      draftable: true,
      options: { next: { tags: [project?.id] } },
    })
  ).value("docs");

  if (!!media?.length) {
    const m = media?.sort((a, b) => {
      const aImg = a?.filename?.match(/\d+/)?.at(-1) as string;
      const bImg = b?.filename?.match(/\d+/)?.at(-1) as string;

      return +aImg - +bImg;
    });

    return (
      <Container>
        <Modal
          slug="project-gallery"
          closeOnBlur={false}
          className={styles["gallery"]}
          lockBodyScroll={false}
        >
          <GalleryContainer media={m}>
            <h3>{project?.name}</h3>

            <Toggler slug="project-gallery">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                enableBackground="new 0 0 24 24"
              >
                <polygon points="1.99,20.19 10.176,12.006 1.989,3.811 3.81,1.99 11.985,10.169 20.17,1.988 22.008,3.809   13.825,11.98 22.012,20.17 20.191,22.008 12.014,13.817 3.811,22.01 "></polygon>
              </svg>
            </Toggler>
          </GalleryContainer>
        </Modal>

        {media?.map((m, idx) => (
          <Lightbox media={m} key={m?.id + "_modal_" + idx} />
        ))}
      </Container>
    );
  }

  return null;
};

export default Gallery;
