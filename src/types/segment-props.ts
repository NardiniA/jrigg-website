export type SegmentAllProps<K extends string = "slug"> = {
  params: { [key in K]: string[] };
} & SegmentProps;

export type SegmentProps<K extends string = "slug"> = {
  params: { [key in K]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};