import { SegmentProps } from "@/types/segment-props";
import Transport, { type GetProps } from "@/lib/transport";
import { notFound } from "next/navigation";
import { GalleryMedia } from "./components/Gallery";
import { Provider } from "./components/Client/Modal";
import { Project } from "@/types/payload-types";
import ProjectHeader from "./components/ProjectHeader";
import Gallery from "@/components/Projects/Gallery";

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

async function getMedia(id: string) {
  const media: GalleryMedia[] = (await new Transport({
    collection: "media",
    query: {
      where: {
        project: {
          equals: id,
        },
      },
      limit: 100_000,
      sort: "filename",
    },
  }).get({
    draftable: true,
    options: { next: { tags: [id] } },
  }))?.value("docs");

  return media?.sort((a, b) => {
    const aImg = a?.filename?.match(/\d+/)?.at(-1) as string;
    const bImg = b?.filename?.match(/\d+/)?.at(-1) as string;

    return +aImg - +bImg;
  });
}

export default async function Page({ params: { slug } }: SegmentProps) {
  const project: Project = (await getProject(slug, { draftable: true })).toSingle();

  if (!project) return notFound();

  const media = await getMedia(project?.id);

  return (
    <Provider transTime={400}>
      <article className="section">
        <ProjectHeader project={project} />

        <Gallery media={media} />
      </article>
    </Provider>
  )
}

export async function generateStaticParams() {
  const transport = new Transport({
    collection: "projects",
    query: {
      where: {
        _status: {
          equals: "published",
        },
      },
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
    description: project?.description,
    openGraph: {
      title: project?.name,
      description: project?.description,
      url: `/gallery/${project?.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project?.name,
      description: project?.description,
    },
  };
}
