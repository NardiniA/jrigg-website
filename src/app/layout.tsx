import "./globals.scss";
import "boxicons/css/boxicons.min.css";
import { inter, pt_serif } from "./fonts";
import { classes } from "@/utilities/classes";
import type { Children } from "@/types/children";
import Providers from "./Providers";
import Header from "@/components/Header";
import { getSettings } from "@/lib/getSettings";

export default async function layout({
  children,
}: Children) {
  const settings = await getSettings({ draftable: true });

  return (
    <html
      lang="en"
      className={classes(
        inter?.variable as string,
        pt_serif?.variable as string,
      )}
    >
      <body>
        <Providers>
          <main className="page">
            <Header data={settings} />
            <main className="main">
              {children}
            </main>
          </main>
        </Providers>
      </body>
    </html>
  )
}
