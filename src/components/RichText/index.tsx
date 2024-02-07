import { CSSProperties } from "react";
import { serialise } from "./serialise";

const RichText: React.FC<{
  content: any[];
  inline?: boolean;
  styles?: CSSProperties;
  [key: string]: unknown;
}> = ({ content, inline, styles, ...rest }) => {
  if (content) return (
    <div style={styles} {...rest}>
      {serialise(content, inline)}
    </div>
  )
}

export default RichText;
