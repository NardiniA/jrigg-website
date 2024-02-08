import type { Category, Project } from "@/types/payload-types";
import { classes } from "@/utilities/classes";
import styles from "./index.module.scss";
import HeaderLink from "./HeaderLink";

const ProjectHeader: React.FC<{ project: Project | { name: string; description?: string, categories?: Category[], slug?: string; }, baseURL: string }> = ({ project: { name, description, categories, slug }, baseURL }) => {
  return (
    <div className={classes("container row", styles["project-header"])}>
      <div className={styles["project-header__container"]}>
        {!!name && <h1>{name}</h1>}

        {!!description && <p>{description}</p>}

        {!!categories?.length && (
          <div className={classes("section-sm", styles["project-header__categories"])}>
            <HeaderLink projectSlug={baseURL} href={baseURL}>
              All
            </HeaderLink>
            {categories?.map((category, idx) => {
              if (typeof category === "string") return null;

              return (
                <HeaderLink categorySlug={category?.slug} href={`/gallery/${slug || "categories"}/${category?.slug}`} key={category?.id + "_project_category_" + idx}>
                  {category?.name}
                </HeaderLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectHeader