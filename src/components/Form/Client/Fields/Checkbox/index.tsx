"use client";

import styles from "./index.module.scss";
import { classes } from "@/utilities/classes";
import { errorMsg } from "@/components/Form/utilities/errorMsg";
import { useController } from "react-hook-form";

const Checkbox: React.FC<{ fieldData: any; control: any }> = ({
  fieldData: { name, label, admin, id },
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

  return (
    <div className={classes(styles["field"], admin?.size)}>
      <label htmlFor={id}>
        <input id={id} type="checkbox" {...field} />
        <span className={styles["field-checkmark"]}>
          <i className="bx bx-check"></i>
        </span>
        {label && <span className={styles["field-label"]}>{label}</span>}
      </label>
      {error && (
        <span className={styles["field-error"]}>{errorMsg(error)}</span>
      )}
    </div>
  );
};

export default Checkbox;
