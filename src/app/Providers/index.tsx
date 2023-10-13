"use client";

import type { Children } from "@/types/children";
import MenuProvider from "./MenuContext";
import ToastContext from "./ToastContext";

const Providers: React.FC<Children> = ({ children }) => (
  <MenuProvider>
    <ToastContext>{children}</ToastContext>
  </MenuProvider>
);

export default Providers;
