import Transport, { GetProps, ParallelTransport } from "@/lib/transport";
import { Category, Project } from "@/types/payload-types";
import { GalleryMedia } from "../components/Gallery";
import Lightbox from "../components/Gallery/Lightbox";
import { Container as ModalContainer, Provider, Toggler } from "../components/Client/Modal";
import Gallery from "./Gallery";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProjectCategory(
  slug: string,
  category: string,
  options?: GetProps
) {
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

  if (!media || !project || !categories) return null;

  const mediaList: GalleryMedia[] = media?.value("docs") as GalleryMedia[];

  if (!mediaList?.length) return notFound();

  return (
    <Provider transTime={400}>
      <main>
        <Gallery
          media={mediaList}
        >
          <h3>
            <Link href={`/gallery/${project?.slug}`}>{project?.name}</Link> /{" "}
            {categories?.name}
          </h3>

          <Link href={`/gallery/${project?.slug}`}>View Project</Link>
        </Gallery>

        <ModalContainer>
          {mediaList?.map((m, idx) => (
            <Lightbox media={m} key={m?.id + "_modal_category_" + idx} />
          ))}
        </ModalContainer>
      </main>
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
