"use client";

import { useModal } from '@faceless-ui/modal';
import React from 'react';

const BoxNav: React.FC<{ currSlug: string, dirSlug: string | null; children: React.ReactNode, className?: string }> = ({ currSlug, dirSlug, children, ...rest }) => {
  const modal = useModal();

  return (
    <button onClick={() => {
      if (dirSlug) {
        modal.toggleModal(dirSlug);
        modal.toggleModal(currSlug);
      }
    }} {...rest}>{children}</button>
  )
}

export default BoxNav