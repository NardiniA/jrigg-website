import Transport from "@/lib/transport"
import { Form as FormType } from "@/types/payload-types";
import Handler from "./Client/Handler";

const Form: React.FC<{ formId: string }> = async ({ formId }) => {
  const transport = new Transport({
    collection: `forms/${formId}`,
  });

  const form: FormType = (await transport.get({ draftable: true })).value();

  if (!form) return null;

  return <Handler form={form} />
}

export default Form;
