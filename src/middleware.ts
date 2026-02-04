// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/admin"];
const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const token = request.cookies.get("accessToken")?.value;

  // Verify token dengan API
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   if (isProtectedRoute && token) {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         const res = NextResponse.redirect(new URL("/login", request.url));
  //         res.cookies.delete("accessToken");
  //         return res;
  //       }

  //       // Optional: Check role-based access
  //       if (path.startsWith("/admin")) {
  //         const userData = await response.json();
  //         if (userData.role !== "admin") {
  //           return NextResponse.redirect(new URL("/unauthorized", request.url));
  //         }
  //       }
  //     } catch {
  //       const res = NextResponse.redirect(new URL("/login", request.url));
  //       res.cookies.delete("accessToken");
  //       return res;
  //     }
  //   }

  if (isPublicRoute && token && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
