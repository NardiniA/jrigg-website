"use client";

import styles from "./toggle.module.scss";
import { useMenuContext } from "@/app/Providers/MenuContext";
import { classes } from "@/utilities/classes";

const Toggle: React.FC = () => {
  const { open, setOpen } = useMenuContext();

  return (
    <button
      className={classes(
        styles["header-toggle"],
        open ? styles["open"] : "",
      )}
      title={open ? "Close Navigation Menu" : "Open Navigation Menu"}
      onClick={() => setOpen(!open)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

export default Toggle;
