"use client";

import type { HTMLProps } from "react";

interface Toggler extends Omit<HTMLProps<HTMLElement>, 'children' | "onClick"> {
  index: number,
  setIndex: any;
  children: React.ReactNode;
}

const Toggler: React.FC<Toggler> = ({ index, setIndex, children, ...rest }) => {
  return (
    // @ts-expect-error
    <button {...rest} onClick={() => setIndex(index)}>{children}</button>
  );
}

export default Toggler;
