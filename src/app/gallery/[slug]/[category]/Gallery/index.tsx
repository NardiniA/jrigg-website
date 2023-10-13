import { classes } from "@/utilities/classes";
import Container, { ContainerProps } from "../../components/Gallery/Container";
import styles from "../../components/Gallery/index.module.scss";

const Gallery: React.FC<ContainerProps> = (props) => {
  return (
    <main className={classes(styles["gallery"], styles["project-category"])}>
      <Container {...props} />
    </main>
  )
}

export default Gallery;
