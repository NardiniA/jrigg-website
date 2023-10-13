import Transport, { GetProps, ParallelTransport } from "@/lib/transport";
import { Category, Project } from "@/types/payload-types";
import { GalleryMedia } from "../components/Gallery";
import Lightbox from "../components/Gallery/Lightbox";
import { Container as ModalContainer, Provider, Toggler } from "../components/Client/Modal";
import Gallery from "./Gallery";
import Link from "next/link";

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

  return {
    media: await new Transport({
      collection: "media",
      query: {
        where: {
          and: [
            {
              project: {
                equals: project?.toSingle()?.id,
              },
            },
            {
              categories: {
                in: [categories?.toSingle()?.id],
              },
            },
          ],
        },
      },
    }).get({ ...options, options: { next: { tags: [project?.value("id")] } } }),
    project: project?.toSingle(),
    categories: categories?.toSingle(),
  };
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

  const mediaList: GalleryMedia[] = media?.value("docs") as GalleryMedia[];

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
