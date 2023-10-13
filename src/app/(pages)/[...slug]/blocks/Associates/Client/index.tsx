"use client";

import type { Children } from "@/types/children";
import { SliderProvider, SliderTrack, Slide as TrackSlide } from "@faceless-ui/slider";

export const Provider: React.FC<{
  [key: string]: unknown;
} & Children> = ({ children, ...rest }) => <SliderProvider {...rest}>{children}</SliderProvider>;

export const Track: React.FC<
  {
    [key: string]: unknown;
  } & Children
> = ({ children, ...rest }) => <SliderTrack {...rest}>{children}</SliderTrack>;

export const Slide: React.FC<{ index: number, [key: string]: unknown; } & Children> = ({ children, index }) => <TrackSlide index={index}>{children}</TrackSlide>;
