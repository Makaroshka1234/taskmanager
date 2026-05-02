import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "Not authenicadet",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          erorr: "User not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      user: {
        id: user?.id,
        email: user?.email,
      },
    });
  } catch {
    return NextResponse.json(
      {
        erorr: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
