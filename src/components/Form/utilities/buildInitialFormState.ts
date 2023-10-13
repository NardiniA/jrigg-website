import { Form } from "@/types/payload-types";

export const buildInitialFormState = (fields: Form["fields"]): { [key: string]: any } => {
  const f = fields?.filter((field) => {
    if (field?.blockType === "message") return false;
    return true;
  });

  return f?.reduce(
    (o: any, cur: any) =>
      Object.assign(o, {
        [cur?.name]: cur?.defaultValue || cur?.admin?.defaultValue || undefined,
      }),
    {}
  );
};
