"use client";

import { Form } from "@/types/payload-types";
import { useForm } from "react-hook-form";
import { buildInitialFormState } from "../utilities/buildInitialFormState";
import { useCallback } from "react";
import { DynamicSelector } from "@/types/dynamic-selector";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { sendData } from "./utilities/sendData";
import RichText from "@/components/RichText";
import { redirect as redirectTo } from "next/navigation";
import SubmitButton from "./components/SubmitButton";
import RenderFields from "./components/RenderFields";

export const fieldOptions: DynamicSelector = {
  text: dynamic(() => import("./Fields/Text"), { ssr: false }),
  tel: dynamic(() => import("./Fields/Text"), { ssr: false }),
  email: dynamic(() => import("./Fields/Text"), { ssr: false }),
  phone: dynamic(() => import("./Fields/Text"), { ssr: false }),
  number: dynamic(() => import("./Fields/Text"), { ssr: false }),
  select: dynamic(() => import("./Fields/Select"), { ssr: false }),
  textarea: dynamic(() => import("./Fields/Textarea"), { ssr: false }),
  checkbox: dynamic(() => import("./Fields/Checkbox"), { ssr: false }),
  message: dynamic(() => import("./Fields/Message"), { ssr: false }),
};

const Handler: React.FC<{ form: Form }> = ({ form: {
  id,
  fields,
  submitButtonLabel,
  confirmationType,
  confirmationMessage,
  redirect,
}, }) => {
  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: buildInitialFormState(fields),
  });

  const handleSubmission = useCallback(async (data: any) => {
    const dataToSend = Object.entries(data).map(([name, value]) => ({
      field: name,
      value,
    }));

    const toaster = toast.loading("Form Submitting...", {
      position: "bottom-right",
    });

    const [response, error] = await sendData(id, dataToSend);

    console.log(response);

    if (error) {
      toast.update(toaster, {
        render: "Unable to submit form.",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
      return;
    } else {
      if (confirmationType === "redirect" && redirect?.url) {
        redirectTo(redirect?.url);
      }
      
      toast.update(toaster, {
        render() {
          return <RichText content={confirmationMessage} /> || "Message Sent!";
        },
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });
      return;
    }
  }, [watch]);

  if (!!fields?.length) return (
    <form
      id={id}
      className="row"
      style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
      onSubmit={handleSubmit(handleSubmission)}
    >
      <RenderFields fields={fields} options={fieldOptions} control={control} />

      <SubmitButton formState={formState} buttonLabel={submitButtonLabel} />
    </form>
  );

  return null;
}

export default Handler;
