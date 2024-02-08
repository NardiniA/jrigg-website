import Transport, { type GetProps, ParallelTransport, type QueryResult } from "@/lib/transport";
import type { Category, Project } from "@/types/payload-types";
import type { GalleryMedia } from "../components/Gallery";
import { notFound } from "next/navigation";
import ProjectHeader from "../components/ProjectHeader";
import { Provider } from "../components/Client/Modal";
import Gallery from "@/components/Projects/Gallery";

async function getProjectCategory(
  slug: string,
  category: string,
  options?: GetProps
): Promise<{ 
  media: QueryResult | null;
  project: Project | null;
  categories: Category | null;
}> {
  const parallel = new ParallelTransport(
    {
      collection: "projects",
      query: {
        where: {
          slug: {
            equals: slug,
          },
        },
      },
    },
    {
      collection: "categories",
      query: {
        where: {
          slug: {
            equals: category,
          },
        },
      },
    }
  );

  const [project, categories] = await parallel.get(options);

  if (!project?.toSingle() || !categories?.toSingle()) return {
    project: null,
    categories: null,
    media: null,
  }

  const projectId = project?.toSingle()?.id;
  const categoryId = categories?.toSingle()?.id;

  const mediaClient = new Transport({
    collection: "media",
    query: {
      where: {
        and: [
          {
            project: {
              equals: projectId,
            },
          },
          {
            categories: {
              in: [categoryId],
            },
          },
        ],
      },
      sort: "filename"
    },
  });

  const mediaDocs = await mediaClient.get({ draftable: true, options: { next: { tags: [projectId] } } });

  if (!mediaDocs) return {
    media: null,
    project: null,
    categories: null,
  }

  const result = {
    media: mediaDocs,
    project: project?.toSingle(),
    categories: categories?.toSingle(),
  };

  return result
}

export default async function Page({
  params: { slug, category },
}: {
  params: { slug: string; category: string };
}) {
  const { media, project, categories } = await getProjectCategory(
    slug,
    category,
    { draftable: true }
  );

  if (!media || !project || !categories) return notFound();

  const mediaList: GalleryMedia[] = media?.value("docs") as GalleryMedia[];

  if (!mediaList?.length) return notFound();

  return (
    <Provider transTime={400}>
      <article className="section">
        <ProjectHeader project={project} baseURL={`/gallery/${project?.slug}`} />

        <Gallery media={mediaList} />
      </article>
    </Provider>
  );
}

export async function generateStaticParams() {
  const parallel = new ParallelTransport(
    {
      collection: "projects",
      query: { limit: 100_000 },
    },
    {
      collection: "categories",
      query: { limit: 100_000 },
    }
  );

  const [projects, categories] = await parallel.get({ draftable: false });

  if (!projects || !categories) throw new Error(`Cannot get projects and/or categories`);

  const paths = projects
    ?.value("docs")
    ?.map(({ slug }: Project) =>
      categories?.value("docs")?.map((category: Category) => ({
        slug: slug,
        category: category?.slug,
      }))
    )
    ?.flat();

  return paths;
}
