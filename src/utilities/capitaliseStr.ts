export const capitaliseStr = (str: string, splitStr?: string): string => {
  return str?.split(splitStr || "-")?.map(s => s[0].toUpperCase() + s.substring(1))?.join(splitStr || " ");
};
