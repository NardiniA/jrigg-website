import Banner from "@/app/(pages)/[...slug]/hero/Banner";
import Column from "@/components/Projects/Column";
import Pagination from "@/components/Projects/Pagination";
import { getSettings } from "@/lib/getSettings";
import Transport from "@/lib/transport";
import { SegmentProps } from "@/types/segment-props";
import { Query } from "@/types/where";
import { Metadata } from "next";

function getProjects(limit: number, query?: Query) {
  return new Transport({
    collection: "projects",
    query: {
      where: { complete: { equals: true }, _status: { equals: "published", }, },
      limit,
      ...query,
    }
  });
}

export default async function Page({ params }: SegmentProps<"page">) {
  const pageNumber = parseInt(params && params.page) || 1;
  const limit = (await getSettings({ draftable: true }))?.config?.projectsPerPage || 6;
  const projects = (await getProjects(limit, { page: +pageNumber }).get({ draftable: true, options: { next: { tags: ["projects"] } } }));

  const bannerData = {
    hero: {
      title: "Projects",
    },
    breadcrumbs: [
      {
        label: "Gallery",
        url: "/gallery",
        id: "gallery_breadcrumb_0",
      },
    ],
  };

  if (pageNumber !== 1) {
    bannerData.breadcrumbs.push({
      label: `Page ${pageNumber}`,
      url: `/gallery/page/${pageNumber}`,
      id: "gallery_breadcrumb_1",
    });
  }

  return (
    <>
      <Banner {...bannerData} />
      <Column docs={projects?.value("docs")} />
      <Pagination page={projects?.value()} />
    </>
  )
}

export async function generateStaticParams() {
  const limit =
    (await getSettings())?.config?.projectsPerPage || 6;

  const totalPages = (await getProjects(limit).get()).value("totalPages");

  let paths: { page: string }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      page: i.toString(),
    });
  }

  return paths;
}

export function generateMetadata({ params: { page } }: SegmentProps<"page">): Metadata {
  return {
    title: `Projects - Page ${page || 1}`,
    description:
      "View our latest and greatest projects with professional photos and videos.",
    openGraph: {
      title: `Projects - Page ${page || 1}`,
      description:
        "View our latest and greatest projects with professional photos and videos.",
      url: `/gallery/${+page > 1 ? `page/${page}` : ""}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Projects - Page ${page || 1}`,
      description:
        "View our latest and greatest projects with professional photos and videos.",
    },
  };
};
