import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const paths = ["/", "/news", "/menu", "/access", "/about"];
  paths.forEach((path) => revalidatePath(path));

  // 個別記事は動的なので news 配下も revalidate
  revalidatePath("/news/[slug]", "page");

  return NextResponse.json({ revalidated: true });
}
