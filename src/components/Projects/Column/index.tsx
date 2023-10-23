import { classes } from "@/utilities/classes";
import styles from "./index.module.scss";
import Card, { ProjectCard } from "../Card";
import { Project } from "@/types/payload-types";

const Column: React.FC<{ docs: Project[] }> = ({ docs }) => {
  if (!!docs?.length) return (
    <section className="section">
      <div className={classes("container", styles["project-container"])}>
        {docs?.map((project, idx) => (
          <Card 
            card={project as ProjectCard["card"]}
            index={idx}
            last={docs?.length - 1 === idx}
            key={project?.slug + "_project_card_comp_" + idx}
          />
        ))}
      </div>
    </section>
  );

  return null;
}

export default Column;
