import Transport from "@/lib/transport";
import { Category, Page } from "@/types/payload-types";
import { notFound } from "next/navigation";
import { default as MediaGallery } from "@/components/Projects/Gallery";
import GalleryHeader from "./GalleryHeader";
import { sortMedia } from "@/utilities/sortMedia";
import { GalleryMedia } from "@/types/media";

const Gallery: React.FC<{
  section: {
    name: string;
    description?: string;
    categories: {
      categories: Category;
      link: {
        type?: 'reference' | 'custom';
        label: string;
        reference: {
          value: Page;
          relationTo: 'pages';
        };
        url: string;
        newTab?: boolean;
      },
    }[],
    media: Category[];
  };
  breadcrumbs?: Page["breadcrumbs"];
  priority: boolean;
}> = async ({ section: { categories, media }, breadcrumbs }) => {
  const transport = new Transport({
    collection: "media",
    query: {
      where: {
        categories: {
          in: media?.map(({ id }) => id),
        },
      },
      limit: 100_000,
      pagination: false,
    }
  });

  const mediaList = sortMedia((await transport.get({ draftable: true })).value("docs")) as GalleryMedia[];

  if (!mediaList?.length) return notFound();

  // Change Gallery Block to an array with a category and link to its specific page. (Individual Page, custom or default)
  return (
    <section className="section">
      <GalleryHeader baseURL={breadcrumbs?.at(0)?.url || "/"} categories={categories} />

      <MediaGallery media={mediaList} />
    </section>
  )
}

export default Gallery;
