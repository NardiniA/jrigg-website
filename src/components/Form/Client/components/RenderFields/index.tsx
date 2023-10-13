"use client";

import { DynamicSelector } from "@/types/dynamic-selector";
import { Form } from "@/types/payload-types";

const RenderFields: React.FC<{ fields: Form["fields"], options: DynamicSelector, control: any }> = ({ fields, options, control }) => {
  if (!!fields?.length) {
    return fields?.map((field, idx) => {
      const FieldToRender = options[field?.blockType];

      if (!FieldToRender) return null;

      return (
        <FieldToRender
          fieldData={field}
          control={control}
          key={field?.id + "_form_field_" + idx}
        />
      )
    });
  }

  return null;
}

export default RenderFields;
