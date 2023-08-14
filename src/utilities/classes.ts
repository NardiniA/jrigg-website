export const classes = (...args: string[]): string => {
  if (!args?.length) return "";
  return args?.filter(Boolean).join(" ");
}
