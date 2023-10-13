import type { GetProps } from "@/lib/transport";
import Transport from "@/lib/transport";
import type { Project } from "@/types/payload-types";
import type { SegmentProps } from "@/types/segment-props";
import { notFound } from "next/navigation";
import { Provider } from "./components/Client/Modal";
import Gallery from "./components/Gallery";
import Slider from "./components/Slider";
import OpenButton from "./components/Gallery/OpenButton";

async function getProject(slug: string, options?: GetProps) {
  return await new Transport({
    collection: "projects",
    query: {
      where: {
        slug: {
          equals: slug,
        },
      },
    },
  }).get(options);
}

export default async function Page({ params: { slug } }: SegmentProps) {
  const project: Project = (
    await getProject(slug, { draftable: true })
  ).toSingle();

  if (!project) return notFound();

  const featured: Project["gallery"]["gallery"] = [
    {
      id: "jPXw7plycMVB",
      media: project?.details?.thumbnail,
      info: "sidebar",
      caption: [],
      sidebar: [
        {
          type: "h1",
          children: [
            {
              text: project?.name,
            },
          ],
        },
        {
          children: [
            {
              text: project?.details?.description,
            },
          ],
        },
      ],
    },
    ...project?.gallery?.gallery,
  ];

  return (
    <Provider transTime={400}>
      <Slider featured={featured} />
      <Gallery project={project} />

      <OpenButton /> 
    </Provider>
  );
}

export async function generateStaticParams() {
  const transport = new Transport({
    collection: "projects",
    query: {
      limit: 100_000,
    },
  });

  const projects: Project[] = (await transport.get()).value("docs");

  return projects?.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params: { slug } }: SegmentProps) {
  const project: Project = (await getProject(slug)).toSingle();

  return {
    title: project?.name,
    description: project?.details?.description,
    openGraph: {
      title: project?.name,
      description: project?.details?.description,
      url: `/gallery/${project?.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project?.name,
      description: project?.details?.description,
    },
  };
}
