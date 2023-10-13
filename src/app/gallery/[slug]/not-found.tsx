import PageNotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Could not find the requested project. Please check the URL is correct or try and find it again."
}

export default function NotFound() {
  return (
    <PageNotFound
      title="Project Not Found"
      desc="Could not find the requested project. Please check the URL is correct or try and find it again."
      btnText="View All Projects"
      btnHref="/gallery"
    />
  );
}
