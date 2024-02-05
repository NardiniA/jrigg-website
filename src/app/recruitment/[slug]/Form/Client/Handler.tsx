"use client";

import { RecruitmentSetting } from "@/types/payload-types";
import { fieldOptions } from "@/components/Form/Client/Handler";
import { useForm } from "react-hook-form";
import { buildInitialFormState } from "@/components/Form/utilities/buildInitialFormState";
import { useCallback, useEffect } from "react";
import RenderFields from "@/components/Form/Client/components/RenderFields";
import SubmitButton from "@/components/Form/Client/components/SubmitButton";
import Upload from "./Fields/Upload";
import { toast } from "react-toastify";
import { sendForm } from "./utilities/sendForm";

const cvInput = {
  name: "file",
  label: "CV Upload",
  admin: {
    size: "column",
    defaultValue: "",
    rules: {
      required: {
        value: true,
        message: "CV is required.",
      },
    },
  },
  id: "cv",
  blockName: "CV",
  blockType: "file",
};

const Handler: React.FC<{ settings: RecruitmentSetting }> = ({
  settings: {
    id,
    fields: { fields },
  },
}) => {
  const { control, handleSubmit, formState, watch } = useForm({
    // @ts-expect-error
    defaultValues: buildInitialFormState([cvInput, ...fields]),
  });

  const handleApplication = useCallback(
    async (data: any) => {
      const formData = new FormData();
      const file = document.querySelector<HTMLFormElement>("input[name=file]");

      if (!file || !file?.files[0]) {
        toast("CV is required!", {
          type: "error",
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }

      if (!data?.name) {
        toast("Name is required!", {
          type: "error",
          position: "bottom-right",
          autoClose: 5000,
        });
        return;
      }

      const toaster = toast.loading("Application Submitting...", {
        position: "bottom-right",
      });

      formData.append("file", file?.files[0]);
      formData.append("name", data?.name);

      const formatData = Object.entries(data)?.filter(
        ([name, _value]) => name !== "file"
      );

      formatData?.forEach(([name, value], idx) => {
        // @ts-expect-error
        const { label } = fields?.find((f: any) => f?.name === name);
        formData.append(`details.${idx}.name`, name as string);
        formData.append(`details.${idx}.label`, label as string);
        formData.append(`details.${idx}.value`, value as any);
      });

      const [response, error] = await sendForm(formData);

      if (response?.message === "Application successfully created." && !error) {
        toast.update(toaster, {
          render: "Application Sent!",
          type: "success",
          autoClose: 5000,
          closeOnClick: true,
          isLoading: false,
        });
      } else {
        toast.update(toaster, {
          render: "Unable to submit application",
          type: "error",
          autoClose: 5000,
          closeOnClick: true,
          isLoading: false,
        });
      }
      
      return;
    },
    [watch, fields] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (!!fields?.length)
    return (
      <form
        id={id}
        className="row"
        style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
        onSubmit={handleSubmit(handleApplication)}
      >
        <Upload fieldData={cvInput} control={control} />

        <RenderFields
          fields={fields}
          options={fieldOptions}
          control={control}
        />

        <SubmitButton formState={formState} buttonLabel={"Apply"} />
      </form>
    );

  return null;
};

export default Handler;
