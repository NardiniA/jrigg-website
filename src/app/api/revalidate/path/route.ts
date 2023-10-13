import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({
      revalidated: false, message: "Invalid token", now: Date.now()
    },
    {
      status: 401, statusText: "Invalid token"
    });
  }

  const paths: string[] = JSON.parse(String(request.nextUrl.searchParams.get("path"))) || [];

  if (!!paths?.length) {
    paths.forEach((path) => {
      revalidatePath(path);
    });

    return NextResponse.json({ revalidated: true, message: "Success!", now: Date.now() });
  }

  return NextResponse.json(
    { revalidated: false, message: "Missing params", now: Date.now() },
    { status: 400, statusText: "Missing params" },
  );
}