"use client";

import type { ImageLoaderProps } from "next/image";

const maxWidth = 1200;

export type LoaderOptions = {
  height?: number;
};

export function loader(options?: LoaderOptions) {
  return function ({ src, width, quality }: ImageLoaderProps) {
    const filename = src?.split("/")?.at(-1);
    const baseURL = src?.replace(filename as string, "");
    const w = width > maxWidth ? String(maxWidth) : String(width);

    return `${baseURL}fit-in/${w}x${
      options?.height || "0"
    }/filters:format(.webp)/filters:quality(${
      quality || 80
    })/filters:strip_exif()/${filename}`;
  };
}

export default function defaultLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const filename = src?.split("/")?.at(-1);
  const baseURL = src?.replace(filename as string, "");
  const w = width > maxWidth ? String(maxWidth) : String(width);

  return `${baseURL}fit-in/${w}x0/filters:format(.webp)/filters:quality(${
    quality || 80
  })/filters:strip_exif()/${filename}`;
}
