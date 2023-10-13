"use client";

import { useController } from "react-hook-form";
import { classes } from "@/utilities/classes";
import styles from "./index.module.scss";
import { errorMsg } from "@/components/Form/utilities/errorMsg";

const Select: React.FC<{ fieldData: any, control: any }> = ({
  fieldData: { name, label, options, admin, id },
  control,
}) => {
  const { field, fieldState: { error } } = useController({
    name,
    control,
    rules: admin?.rules,
  });

  return (
    <div className={classes(styles["field"], admin?.size)}>
      {label && (
        <label htmlFor={id}>
          {label} {admin?.rules?.required?.value ? <span>*</span> : null}
        </label>
      )}
      <div className={styles["field-select"]}>
        <select placeholder={admin?.placeholder} id={id} {...field}>
          <option value="" disabled selected>
            {(admin?.placeholder as string) || "Choose an option."}
          </option>
          {options?.map(({ label, value, id }: any, j: number) => (
            <option value={value} key={id + "_select_" + j}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className={styles["field-error"]}>{errorMsg(error)}</span>
      )}
    </div>
  );
};

export default Select;
