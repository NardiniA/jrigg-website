import { DynamicSelector } from "@/types/dynamic-selector";
import { Page } from "@/types/payload-types";
import dynamic from "next/dynamic";

const blocks: DynamicSelector = {
  "associates-block": dynamic(() => import("./Associates"), { ssr: false }),
  contact: dynamic(() => import("./Contact"), { ssr: false }),
  "embed-form": dynamic(() => import("./Form"), { ssr: false }),
  "gallery-list": dynamic(() => import("./Gallery"), { ssr: false }),
  "projects-list": dynamic(() => import("./Projects"), { ssr: false }),
  "recruitment-list": dynamic(() => import("./Recruitment"), { ssr: false }),
  "rich-text-block": dynamic(() => import("./RichText"), { ssr: false }),
  "team-block": dynamic(() => import("./Team"), { ssr: false }),
  "text-image-block": dynamic(() => import("./TextImage"), { ssr: false }),
};

const Blocks: React.FC<{ sections: Page["sections"]; breadcrumbs: Page["breadcrumbs"] }> = ({ sections, breadcrumbs }) => {
  if (!!sections?.length) {
    return sections?.map((section, idx) => {
      const Comp = blocks[section?.blockType];

      if (!Comp) return null;

      const id = section?.id || section?.blockType + "pages_section" + idx;

      return <Comp section={section} key={id} breadcrumbs={breadcrumbs} priority={idx === 0} />;
    })?.filter(Boolean);
  }
}

export default Blocks;
