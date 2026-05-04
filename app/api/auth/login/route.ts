import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const res = NextResponse.json({ message: "Logged in" });

  if (!email || !password) {
    return NextResponse.json(
      {
        error: "Email and password are required",
      },
      {
        status: 400,
      },
    );
  }
  const findUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!findUser) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, findUser.password);

  if (!isValid) {
    return NextResponse.json(
      {
        error: "Invalid credentials",
      },
      {
        status: 401,
      },
    );
  }
  const accessToken = jwt.sign(
    { userId: findUser.id },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: findUser.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );

  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15, // 15 хв
    sameSite: "lax",
  });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 днів
    sameSite: "lax",
  });
  return res;
}
