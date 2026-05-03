import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
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
  const token = jwt.sign(
    { userId: findUser.id, userEmail: findUser.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );
  return NextResponse.json(
    {
      message: "Logged in ",
    },
    {
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
      },
      status: 200,
    },
  );
}
