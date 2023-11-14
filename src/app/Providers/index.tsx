"use client";

import type { Children } from "@/types/children";
import MenuProvider from "./MenuContext";
import ToastContext from "./ToastContext";
import { useEffect } from "react";
import Aos from "aos";

const Providers: React.FC<Children> = ({ children }) => {
  useEffect(() => {
    Aos.init({
      mirror: false,
      once: true,
      
      debounceDelay: 50,
      duration: 400,
    });
  }, []);

  return (
    <MenuProvider>
      <ToastContext>{children}</ToastContext>
    </MenuProvider>
  );
};

export default Providers;
