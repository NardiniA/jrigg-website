import { Category, Page } from "@/types/payload-types";
import styles from "@/app/gallery/[slug]/components/ProjectHeader/index.module.scss";
import HeaderLink from "@/app/gallery/[slug]/components/ProjectHeader/HeaderLink";
import { parseLink } from "@/utilities/parseLink";

const GalleryHeader: React.FC<{
  baseURL: string;
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
}> = ({ baseURL, categories }) => {
  return (
    <div className="section-sm" style={{ paddingTop: "0" }}>
      <div className="container row">
        <div className={styles["project-header__container"]}>
          <div className={styles["project-header__categories"]}>
            <HeaderLink projectSlug={baseURL} href={baseURL}>
              All
            </HeaderLink>
            {categories?.map(({ categories: { id }, link }, idx) => {
              const href = parseLink(link);

              return (
                <HeaderLink categorySlug={href} href={href} key={id + "_gallery_header_categories_" + idx}>
                  {link?.label}
                </HeaderLink>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryHeader