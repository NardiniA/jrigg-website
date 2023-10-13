import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid token", now: Date.now() },
      { status: 401, statusText: "Invalid token" }
    );
  }

  const tags: string[] = JSON.parse(String(request.nextUrl.searchParams.get("tags"))) || [];

  if (!!tags?.length) {
    tags?.forEach((tag) => {
      revalidateTag(tag);
    });

    return NextResponse.json({ revalidated: true, message: "Success!", now: Date.now() });
  }

  return NextResponse.json(
    { revalidate: false, message: "Missing params", now: Date.now() },
    { status: 400, statusText: "Missing params" },
  );
}