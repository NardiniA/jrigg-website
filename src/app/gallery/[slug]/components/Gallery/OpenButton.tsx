import styles from "./open.module.scss";
import { Toggler } from "../Client/Modal";

const OpenButton: React.FC = () => {
  return (
    <Toggler slug="project-gallery" className={styles["button"]}>
      <i className="bx bx-images"></i>
      View Gallery
    </Toggler>
  );
}

export default OpenButton;
