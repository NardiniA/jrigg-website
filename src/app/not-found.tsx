import PageNotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "Could not find the requested page. Please check the URL is correct, otherwise let us know.",
};

export default function NotFound() {
  return (
    <PageNotFound desc="Could not find the requested page. Please check the URL is correct, otherwise let us know." />
  );
}
