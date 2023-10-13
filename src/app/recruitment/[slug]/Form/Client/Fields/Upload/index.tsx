"use client";

import styles from "./index.module.scss";
import { classes } from "@/utilities/classes";
import { errorMsg } from "@/components/Form/utilities/errorMsg";
import { useController } from "react-hook-form";

const Upload: React.FC<{ fieldData: any, control: any }> = ({ fieldData: { name, label, admin, id }, control }) => {
  const { field, fieldState: { error } } = useController({
    name: name,
    control,
    rules: admin?.rules,
  });

  return (
    <div className={classes(styles["field"], "column")}>
      <div className={styles["field-container"]}>
        <label htmlFor={id}>
          <i className="bx bx-cloud-upload"></i>
          {label}
        </label>
        {!!field?.value && (
          <span className={styles["field-value"]}>
            {field?.value.replace("C:\\fakepath\\", "")}
          </span>
        )}
      </div>
      <input type="file" {...field} id={id} accept="application/pdf" />
      {error && (
        <span className={styles["field-error"]}>{errorMsg(error)}</span>
      )}
    </div>
  );
}

export default Upload;
