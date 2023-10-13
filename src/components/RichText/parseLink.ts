export const parseLink = (node: any): string => {
  if (node?.linkType === "internal") {
    const { value, relationTo } = node?.doc;

    const crumbs = value?.breadcrumbs?.at(-1)?.url;

    if (crumbs) return crumbs;
    else
      return `/${relationTo === "pages" ? "" : relationTo}/${
        value?.slug || ""
      }`;
  }

  return node?.url;
};
