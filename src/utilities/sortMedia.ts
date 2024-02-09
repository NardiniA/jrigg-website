import { GalleryMedia } from "@/types/media";
import { Media } from "@/types/payload-types"

type FilenameInfo = {
  prefix: string;
  number: number;
} | null;

type SortMedia = (media: (Media | GalleryMedia)[]) => (Media | GalleryMedia)[]

function parseFilename(filename: string): FilenameInfo {
  const match = filename.match(/^(.+)-(\d+)\.(.*)$/);
  return match ? {
    prefix: match[1],
    number: parseInt(match[2]),
  } : null;
}

export const sortMedia = (media: Media[]): Media[] => {
  return media?.sort((a, b) => {
    const parsedA = parseFilename(a?.filename as string);
    const parsedB = parseFilename(b?.filename as string);

    if (!parsedA || !parsedB) throw new Error("Invalid filename format");

    const prefixComparison = parsedA.prefix.localeCompare(parsedB.prefix);
    if (prefixComparison !== 0) return prefixComparison;

    return parsedA.number - parsedB.number;
  })
}
