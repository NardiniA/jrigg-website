export const parseLink = (link: any): string => {
  if (link?.type === "reference") {
    const { value } = link?.reference;

    const crumbs = value?.breadcrumbs?.at(-1)?.url;

    if (crumbs) return crumbs;
    else return `/${value?.slug || ""}`;
  }

  return link?.url;
}