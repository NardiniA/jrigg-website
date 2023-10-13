import type { SegmentAllProps } from "@/types/segment-props";
import type { Metadata } from "next";
import Transport from "@/lib/transport";
import { Media, Page as PageType } from "@/types/payload-types";
import { generateMetaImage } from "@/utilities/generateMetaImage";
import { notFound } from "next/navigation";
import Hero from "./hero";
import Blocks from "./blocks";

const transport = ({ slug }: SegmentAllProps["params"]) => {
  const s = slug?.at(-1) || "home";

  return new Transport({
    collection: "pages",
    query: {
      where: {
        slug: {
          equals: s,
        },
      },
    },
  });
};

export default async function Page({ params }: SegmentAllProps) {
  const page: PageType = (await transport(params).get({ draftable: true })).toSingle();

  if (!page) return notFound();

  return (
    <>
      <Hero hero={page?.hero} breadcrumbs={page?.breadcrumbs} />
      <Blocks sections={page?.sections} />
    </>
  )
}

export async function generateStaticParams() {
  const page = await new Transport({
    collection: "pages",
    query: {
      limit: 100_000,
    },
  }).get();

  const docs: PageType[] = page?.value("docs");

  return docs?.map((doc) => {
    const crumbs = doc?.breadcrumbs?.at(-1)?.url?.split("/");

    crumbs?.shift();

    return {
      slug: crumbs,
    };
  });
}

export async function generateMetadata({
  params,
}: SegmentAllProps): Promise<Metadata> {
  const page: PageType = (await transport(params).get()).toSingle();

  if (!page) return {};

  const { meta } = page;

  const ogImage = generateMetaImage(meta?.image as Media);

  return {
    title: meta?.title,
    description: meta?.description,
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: `/${page?.breadcrumbs?.at(-1)?.url}`,
      images: [
        {
          url: ogImage?.url as string,
          width: ogImage?.width,
          height: ogImage?.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title,
      description: meta?.description,
      images: [ogImage?.url as string],
    },
  };
}