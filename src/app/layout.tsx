import "./globals.scss";
import "boxicons/css/boxicons.min.css";
import { inter, pt_serif } from "./fonts";
import { classes } from "@/utilities/classes";
import type { Children } from "@/types/children";

export default async function layout({
  children,
}: Children) {
  return (
    <html
      lang="en"
      className={classes(
        inter?.variable as string,
        pt_serif?.variable as string,
      )}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
