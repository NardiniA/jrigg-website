import "server-only";
import Transport from "./transport";

export const getSettings = async (options?: { draftable?: boolean, property?: string }): Promise<Transport> => {
  const transport = await new Transport({
    collection: "globals/settings",
  }).get({ draftable: options?.draftable });

  return transport.value(options?.property);
}
