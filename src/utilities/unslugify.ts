import { capitaliseStr } from "./capitaliseStr"

export const unslugify = (slug: string): string => {
  return capitaliseStr(slug);
}
