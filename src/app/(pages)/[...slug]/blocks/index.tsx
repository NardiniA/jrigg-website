import { DynamicSelector } from "@/types/dynamic-selector";
import { Page } from "@/types/payload-types";
import dynamic from "next/dynamic";

const blocks: DynamicSelector = {
  "associates-block": dynamic(() => import("./Associates")),
  contact: dynamic(() => import("./Contact")),
  "embed-form": dynamic(() => import("./Form")),
  "projects-list": dynamic(() => import("./Projects")),
  "recruitment-list": dynamic(() => import("./Recruitment")),
  "rich-text-block": dynamic(() => import("./RichText")),
  "team-block": dynamic(() => import("./Team")),
  "text-image-block": dynamic(() => import("./TextImage")),
};

const Blocks: React.FC<{ sections: Page["sections"] }> = ({ sections }) => {
  if (!!sections?.length) {
    return sections?.map((section, idx) => {
      const Comp = blocks[section?.blockType];

      if (!Comp) return null;

      const id = section?.id || section?.blockType + "pages_section" + idx;

      return <Comp section={section} key={id} priority={idx === 0} />;
    })?.filter(Boolean);
  }
}

export default Blocks;
