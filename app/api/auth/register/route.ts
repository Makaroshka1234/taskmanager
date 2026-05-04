import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        error: "missing data",
      },
      {
        status: 400,
      },
    );
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json(
      {
        error: "Existing user",
      },
      {
        status: 409,
      },
    );
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedpassword,
    },
  });
  const acсessToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );
  const res = NextResponse.json({ message: "User created" }, { status: 201 });

  res.cookies.set("accessToken", acсessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15,
    sameSite: "lax",
  });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return res;
}
