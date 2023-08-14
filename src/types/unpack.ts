export type UnpackArray<T extends any[]> = T extends (infer U)[] ? U : never;
