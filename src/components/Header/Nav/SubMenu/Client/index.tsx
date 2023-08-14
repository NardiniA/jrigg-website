"use client";

import type { Children } from "@/types/children";
import {
  Collapsible,
  CollapsibleToggler,
  CollapsibleContent,
} from "@faceless-ui/collapsibles";

type ChildrenAndProps = {
  [key: string]: unknown;
} & Children;

export const Wrapper: React.FC<Children> = ({ children }) => (
  <Collapsible transTime={500} transCurve="ease-in-out">{children}</Collapsible>
);

export const Toggler: React.FC<ChildrenAndProps> = ({ children, ...rest }) => (
  <CollapsibleToggler {...rest}>{children}</CollapsibleToggler>
);

export const ContentContainer: React.FC<ChildrenAndProps> = ({ children, ...rest }) => (
  <CollapsibleContent {...rest}>{children}</CollapsibleContent>
);
