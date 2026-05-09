import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logg out" });

  res.cookies.delete("refreshToken");
  res.cookies.delete("accessToken");
  return res;
}
