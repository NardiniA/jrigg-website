import styles from "./index.module.scss";
import { classes } from "@/utilities/classes";
import { default as Content } from "@/components/RichText";
import { Children } from "@/components/RichText/serialise";

const RichText: React.FC<{ section: { align: "left" | "center" | "right", richText: Children }, priority: boolean }> = ({ section: { align, richText } }) => {
  if (!!richText?.length) return (
    <section className="section">
      <div className="container">
        <div className={classes("row", styles["rich-text-row"])}>
          <Content content={richText} className="content" styles={{ textAlign: align }} />
        </div>
      </div>
    </section>
  );

  return null;
}

export default RichText;
