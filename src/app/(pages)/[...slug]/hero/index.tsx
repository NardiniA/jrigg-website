import { DynamicSelector } from "@/types/dynamic-selector";
import { Page } from "@/types/payload-types";
import dynamic from "next/dynamic";

const sections: DynamicSelector = {
  banner: dynamic(() => import("./Banner")),
  intro: dynamic(() => import("./Intro")),
}

const Hero: React.FC<{ hero: Page["hero"], breadcrumbs: Page["breadcrumbs"] }> = ({ hero, breadcrumbs }) => {
  if (!hero) return null;

  const Comp = sections[hero?.type];

  return <Comp hero={hero[hero?.type]} breadcrumbs={breadcrumbs} />
}

export default Hero;
