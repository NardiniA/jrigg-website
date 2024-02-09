import { GalleryMedia } from "@/types/media";
import { Media } from "@/types/payload-types"

type FilenameInfo = {
  prefix: string;
  number: number;
} | null;

type SortMedia = (media: (Media | GalleryMedia)[]) => (Media | GalleryMedia)[]

function parseFilename(filename: string): FilenameInfo {
  const number = filename?.match(/\d+/)?.at(-1);
  const project = filename?.split(/\d+/)[0]?.replace(/-/g, " ");

  return (project && number) ? {
    prefix: project,
    number: parseInt(number),
  } : null;
}

export const sortMedia: SortMedia = (media) => {
  return media?.sort((a, b) => {
    const parsedA = parseFilename(a?.filename as string);
    const parsedB = parseFilename(b?.filename as string);

    
    if (!parsedA || !parsedB) {
      console.log(parsedA);
      console.log(parsedB);
      throw new Error("Invalid filename format");
    }

    const prefixComparison = parsedA.prefix.localeCompare(parsedB.prefix);
    if (prefixComparison !== 0) return prefixComparison;

    return parsedA.number - parsedB.number;
  })
}
