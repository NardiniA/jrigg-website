import Transport from "@/lib/transport";
import type { GalleryMedia } from "@/types/media";
import { Category } from "@/types/payload-types";
import type { SegmentProps } from "@/types/segment-props";
import { Metadata } from "next";
import { unslugify } from "@/utilities/unslugify";
import Banner from "@/app/(pages)/[...slug]/hero/Banner";
import Gallery from "@/components/Projects/Gallery";
import { sortMedia } from "@/utilities/sortMedia";

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

  const mediaList = sortMedia(mediaTransport?.value("docs")) as GalleryMedia[];

  return (
    <main>
      <Banner hero={{
        title: categories?.name,
        description: [
          {
            children: [
              {
                text: `Find ${categories?.name} photos from across our various projects.`,
              },
            ],
          },
        ],
      }} />

      <Gallery media={mediaList} />
    </main>
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
