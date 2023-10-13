import styles from "./index.module.scss";
import RichText from "@/components/RichText";
import { Children } from "@/components/RichText/serialise";

const Message: React.FC<{ fieldData: { message: Children } }> = ({ fieldData: { message } }) => {
  if (!!message?.length) return (
    <div className={styles["message-wrapper"]}>
      <RichText content={message} className={styles["message"]} />
    </div>
  );

  return null;
}

export default Message;
