import { classes } from "@/utilities/classes";
import styles from "./index.module.scss";
import Card from "../Card";
import { Project } from "@/types/payload-types";

const Column: React.FC<{ docs: Project[] }> = ({ docs }) => {
  if (!!docs?.length) return (
    <section className="section">
      <div className={classes("container", styles["project-container"])}>
        {docs?.map((project, idx) => (
          <Card 
            card={project}
            index={idx}
            last={docs?.length - 1 === idx}
          />
        ))}
      </div>
    </section>
  );

  return null;
}

export default Column;
