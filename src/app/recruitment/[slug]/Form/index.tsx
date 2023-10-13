import Transport from "@/lib/transport";
import { Form as FormType, RecruitmentSetting } from "@/types/payload-types";
import Handler from "./Client/Handler";

const Form: React.FC = async () => {
  const transport = new Transport({
    collection: "globals/recruitment-settings",
  });

  const settings: RecruitmentSetting = (await transport.get({ draftable: true })).value();

  if (!settings) return null;

  return <Handler settings={settings} />
}

export default Form;
