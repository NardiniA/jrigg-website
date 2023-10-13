type BaseURLSType = {
  [key: string]: string;
}

const baseURLS: BaseURLSType = {
  "pages": "/",
  "projects": "/gallery/",
  "categories": "/gallery/categories/",
  "recruitment": "/recruitment/",
}

export const generateURL = (collection: string, doc: any): string => {
  if (collection === "pages") {
    return `${doc?.breadcrumbs?.at(-1)?.url}`;
  }

  const base = baseURLS[collection] || "/";

  return `${base}${doc?.slug || ""}`;
}
