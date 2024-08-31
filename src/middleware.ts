import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;
  const userId = url.pathname.split("/")[2];

  console.log("userId", userId);
  console.log("toke.subn", token?.sub);

  if (token?.sub !== userId) {
    // 自分以外のユーザーのページにアクセスしようとした場合
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

// ミドルウェアが適用されるパスを設定
export const config = {
  matcher: "/user/:id/edit",
};
