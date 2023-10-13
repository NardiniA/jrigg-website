"use client";

import type { SliderProviderProps } from "@faceless-ui/slider/dist/SliderProvider";
import type { SliderTrackProps } from "@faceless-ui/slider/dist/SliderTrack";
import type { SlideProps } from "@faceless-ui/slider/dist/Slide";
import type { DotNavProps } from "@faceless-ui/slider/dist/DotNav";
import { SliderProvider, SliderTrack, Slide as SliderSlide, DotNav } from "@faceless-ui/slider";

export const Provider: React.FC<SliderProviderProps> = ({ children, ...rest }) => <SliderProvider {...rest}>{children}</SliderProvider>;
export const Track: React.FC<SliderTrackProps> = ({ children, ...rest }) => <SliderTrack {...rest}>{children}</SliderTrack>;
export const Slide: React.FC<SlideProps> = ({ children, ...rest }) => <SliderSlide {...rest}>{children}</SliderSlide>;
export const Pgn: React.FC<DotNavProps> = ({ children, ...rest }) => <DotNav {...rest}>{children}</DotNav>;
