import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

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
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        error: "User already exists",
      },
      {
        status: 409,
      },
    );
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPass,
    },
  });
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return NextResponse.json(
    {
      message: "User created",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    },
    {
      status: 201,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
      },
    },
  );
}
