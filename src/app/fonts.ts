import { Inter, PT_Serif } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--body-font",
  display: "swap",
});

export const pt_serif = PT_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--serif-font",
  display: "swap",
});
