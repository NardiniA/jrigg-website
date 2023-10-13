import type { ImageLoaderProps } from "next/image";

export default function generateImageURL({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const filename = src?.split("/")?.at(-1);
  const baseURL = src?.replace(filename as string, "");
  const w = width > 1500 ? String(1500) : String(width);

  return `${baseURL}fit-in/${w}x0/filters:format(.webp)/filters:quality(${
    quality || 80
  })/filters:strip_exif()/filters:strip_icc()/${filename}`;
}
