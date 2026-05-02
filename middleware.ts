import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/reg";

  const isProtectedPage = req.nextUrl.pathname.startsWith("/profile");

  // 🔴 якщо НЕ залогінений і йде на profile
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔥 якщо ЗАЛОГІНЕНИЙ і йде на login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}
