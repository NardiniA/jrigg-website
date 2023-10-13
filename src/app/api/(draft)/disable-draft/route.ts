import { RedirectType } from "next/dist/client/components/redirect";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(_request: Request) {
  draftMode().disable();
  redirect("/", RedirectType.replace);
}
