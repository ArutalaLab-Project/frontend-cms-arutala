import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/general/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/general/:path*", "/sign-in"],
};
