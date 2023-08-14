import { Setting } from "@/types/payload-types";
import { UnpackArray } from "@/types/unpack";

export type NavTypes = UnpackArray<Setting["navigation"]["items"]>;