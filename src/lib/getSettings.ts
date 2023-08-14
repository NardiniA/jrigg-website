import "server-only";
import Transport, { GetProps, TransportProps } from "./transport";
import { Setting } from "@/types/payload-types";

export const settingsOptions: TransportProps = {
  collection: "globals/settings",
}

export const getSettings = async (options?: GetProps): Promise<Setting> => {
  const transport = new Transport(settingsOptions);

  return (await transport.get(options)).value();
}
