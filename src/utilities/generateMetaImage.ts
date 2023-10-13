import { Media } from "@/types/payload-types";

const defaultDimensions: { width: number; height: number } = {
  width: 970,
  height: 500,
};

export const generateMetaImage = (ogImage: Media): Media => {
  const newImageURL = ogImage?.url?.replace(
    ogImage?.filename as string,
    `fit-in/${defaultDimensions?.width}x${defaultDimensions?.height}/${
      ogImage?.filename as string
    }`
  );

  return {
    ...ogImage,
    url: newImageURL,
    width: defaultDimensions?.width,
    height: defaultDimensions?.height,
  };
};
