"use client";

import PageNotFound from "@/components/NotFound";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Something went wrong!",
  description:
    "An error has occured. Try to reload the page or let us know of the error.",
};

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageNotFound
      title="Something went wrong!"
      desc="Something has went wrong. Please try again later, otherwise let us know and we will try and fix it for you as soon as we can."
    >
      <button className="error-btn" onClick={() => reset()}>
        <span className="error-btn-icon"></span>
        <span className="error-btn-text">Reload</span>
      </button>
    </PageNotFound>
  );
}
