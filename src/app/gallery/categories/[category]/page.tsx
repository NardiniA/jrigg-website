import Transport from "@/lib/transport";
import { Provider, Container as ModalContainer } from "../../[slug]/components/Client/Modal";
import type { GalleryMedia } from "../../[slug]/components/Gallery";
import Lightbox from "../../[slug]/components/Gallery/Lightbox";
import Gallery from "../../[slug]/[category]/Gallery";
import { Category } from "@/types/payload-types";
import Link from "next/link";
import type { SegmentProps } from "@/types/segment-props";
import { Metadata } from "next";
import { unslugify } from "@/utilities/unslugify";

export default async function Page({ params: { category } }: SegmentProps<"category">) {
  const categories = (await new Transport({
    collection: "categories",
    query: {
      where: {
        slug: {
          equals: category,
        },
      },
    },
  }).get({ draftable: true })).toSingle();

  const mediaTransport = await new Transport({
    collection: "media",
    query: {
      where: {
        categories: {
          in: [categories?.id],
        },
      },
      sort: "filename",
      limit: 100_000,
    },
  }).get({ draftable: true, options: { next: { tags: [categories?.id] } } });

  const mediaList: GalleryMedia[] = mediaTransport?.value("docs") as GalleryMedia[];

  return (
    <Provider transTime={400}>
      <main>
        <Gallery
          showProjectTitle
          media={mediaList}
        >
          <h3>
            {categories?.name}
          </h3>

          <Link href="/gallery">View Projects</Link>
        </Gallery>

        <ModalContainer>
          {mediaList?.map((m, idx) => (
            <Lightbox
              media={m}
              showProjectTitle
              key={m?.id + "_modal_category_" + idx}
              prev={idx !== 0 ? mediaList[idx - 1]?.id : null}
              next={(mediaList?.length - 1) !== idx ? mediaList[idx + 1]?.id : null}
            />
          ))}
        </ModalContainer>
      </main>
    </Provider>
  );
}

export async function generateStaticParams() {
  const categories: Category[] = (await new Transport({
    collection: "categories",
    query: { limit: 100_000 },
  }).get({ draftable: false })).value("docs");

  return categories?.map(({ slug }) => ({
    category: slug,
  }));
}

export function generateMetadata({ params: { category } }: SegmentProps<"category">): Metadata {
  const categoryName = unslugify(category);

  return {
    title: `${categoryName} Category`,
    description: `View all the ${categoryName} photos from across our projects.`,
    openGraph: {
      title: `${categoryName} Category`,
      description: `View all the ${categoryName} photos from across our projects.`,
      url: `/gallery/categories/${category}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Category`,
      description: `View all the ${categoryName} photos from across our projects.`,
    },
  };
};
