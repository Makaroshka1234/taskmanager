import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const isAuthPage =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";

  const isProtectedPage = req.nextUrl.pathname.startsWith("pages/profile");

  // 🔴 якщо не залогінений і йде в protected routes
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔥 якщо залогінений і заходить на login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}
