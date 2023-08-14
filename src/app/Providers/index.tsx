"use client";

import type { Children } from "@/types/children";
import MenuProvider from "./MenuContext";

const Providers: React.FC<Children> = ({ children }) => (
  <MenuProvider>{children}</MenuProvider>
)

export default Providers;
