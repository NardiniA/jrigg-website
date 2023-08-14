"use client";

import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Children } from "@/types/children";

export const MenuContext = createContext({
  open: false,
  setOpen: {} as Dispatch<SetStateAction<Partial<boolean>>>,
});

export const useMenuContext = () => useContext(MenuContext);

const MenuProvider: React.FC<Children> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
