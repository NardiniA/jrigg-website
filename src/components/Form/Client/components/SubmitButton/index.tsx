"use client";

import styles from "./index.module.scss";
import { classes } from "@/utilities/classes";

const SubmitButton: React.FC<{ formState: any, buttonLabel?: string }> = ({ formState, buttonLabel = "Submit" }) => (
  <div className={styles["submit-button-row"]}>
    <button
      type="submit"
      disabled={!formState?.isValid || formState?.isSubmitting}
      className={classes(
        styles["submit-button"],
        !formState?.isValid || formState?.isSubmitting
          ? styles["disabled"]
          : ""
      )}
    >
      <span className={styles["submit-button-icon"]}></span>
      <span className={styles["submit-button-text"]}>
        {buttonLabel}
      </span>
    </button>
  </div>
)

export default SubmitButton;
