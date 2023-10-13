"use client";

import { useController } from "react-hook-form";
import { classes } from "@/utilities/classes";
import styles from "./index.module.scss";
import { errorMsg } from "../../../utilities/errorMsg";

const Text: React.FC<{ fieldData: any; control: any }> = ({
  fieldData: { name, label, placeholder, admin, id, blockType },
  control,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: admin?.rules,
  });

  const minLength = admin?.rules?.minLength?.value;
  const maxLength = admin?.rules?.maxLength?.value;

  return (
    <div className={classes(styles["field"], admin?.size)}>
      {label && (
        <label htmlFor={id}>
          {label} {admin?.rules?.required?.value ? <span>*</span> : null}
        </label>
      )}
      {minLength || maxLength ? (
        <span className={styles["field-desc"]}>
          {minLength ? `${minLength} minimum characters. ` : null}
          {maxLength ? `${maxLength} maximum characters.` : null}
        </span>
      ) : null}
      <input
        type={blockType || "text"}
        placeholder={placeholder || admin?.placeholder || ""}
        id={id}
        {...field}
      />
      {error && (
        <span className={styles["field-error"]}>{errorMsg(error)}</span>
      )}
    </div>
  );
};

export default Text;
