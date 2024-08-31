import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import type { IncomingHttpHeaders } from "http";

export async function middleware(request: NextRequest) {
  // HeadersをIncomingHttpHeaders形式に変換
  const headers: IncomingHttpHeaders = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const url = request.nextUrl;
  const userId = url.pathname.split("/")[2];

  const session = await getSession({ req: { headers } });

  if (session?.user?.id !== userId) {
    // 自分以外のユーザーのページにアクセスしようとした場合
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

// ミドルウェアが適用されるパスを設定
export const config = {
  matcher: "/user/:id/edit",
};
