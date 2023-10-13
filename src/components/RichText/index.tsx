import { serialise } from "./serialise";

const RichText: React.FC<{
  content: any[];
  inline?: boolean;
  [key: string]: unknown;
}> = ({ content, inline, ...rest }) => {
  if (content) return (
    <div {...rest}>
      {serialise(content, inline)}
    </div>
  )
}

export default RichText;
