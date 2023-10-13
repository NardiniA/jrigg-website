"use client";

import type { Children } from "@/types/children";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext: React.FC<Children> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}

export default ToastContext;
