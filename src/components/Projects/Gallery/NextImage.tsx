import Image from "next/image"
import { ContainerRect, Slide, SlideImage } from "yet-another-react-lightbox";

function isNextJsImage(slide: Slide) {
  return slide?.type === "image" && typeof slide.width === 'number' && typeof slide.height === 'number';
}

const NextImage = ({ slide, offset, rect }: { 
  slide: Slide;
  offset: number;
  rect: ContainerRect;
}) => {
  if (!isNextJsImage(slide)) return null;

  const slideImage = slide as SlideImage;

  const width = rect.width;
  const height = rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={slideImage?.src}
        alt={slideImage?.alt as string}
        style={{ objectFit: "contain" }}
        fill
      />
    </div>
  )
}

export default NextImage