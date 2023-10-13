import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getDocBySlug } from "./getDocBySlug";
import { generateURL } from "./generateURL";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const collection = searchParams.get("collection");
  const slug = searchParams.get("slug");

  if (secret !== process.env.REVALIDATION_SECRET || !collection || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  const doc = await getDocBySlug(collection, slug);

  if (!doc) {
    return new Response("Invalid slug or collection", { status: 401 });
  }

  draftMode().enable();

  const redirectURL = generateURL(collection, doc);

  redirect(redirectURL);
  return;
}
