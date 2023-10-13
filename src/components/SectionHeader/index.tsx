import styles from "./index.module.scss";
import RichText from "../RichText";

const baseClass = "section-header";

const SectionHeader: React.FC<{ header: any }> = ({ header }) => {
  if (!!header) {
    const { title, description } = header;

    return (
      <header className={styles[baseClass]}>
        <div className="row">
          <div className={styles[`${baseClass}-column`]}>
            {!!title && <h1 className={styles[`${baseClass}-title`]}>{title}</h1>}
            {!!description && (
              <RichText
                content={description}
                className={styles[`${baseClass}-description`]}
                inline
              />
            )}
          </div>
        </div>
      </header>
    )
  }

  return null;
}

export default SectionHeader;
