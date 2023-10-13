"use client";

import type { ModalProviderProps } from "@faceless-ui/modal/dist/ModalProvider";
import type { ModalContainerProps } from "@faceless-ui/modal/dist/ModalContainer";
import type { ModalProps } from "@faceless-ui/modal/dist/Modal";
import type { ModalTogglerProps } from "@faceless-ui/modal/dist/ModalToggler";
import { ModalProvider, ModalContainer, Modal as ClientModal, ModalToggler } from "@faceless-ui/modal";

export const Provider: React.FC<ModalProviderProps> = ({ children, ...rest }) => {
  return (
    <ModalProvider {...rest}>{children}</ModalProvider>
  )
};

export const Container: React.FC<ModalContainerProps> = ({ children, ...rest }) => <ModalContainer {...rest}>{children}</ModalContainer>;

export const Modal: React.FC<ModalProps> = ({ children, ...rest }) => <ClientModal {...rest}>{children}</ClientModal>;

export const Toggler: React.FC<ModalTogglerProps> = ({ children, ...rest }) => <ModalToggler {...rest}>{children}</ModalToggler>;
