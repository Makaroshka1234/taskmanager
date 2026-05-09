import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "TOKEN_EXPIRED",
      },
      {
        status: 401,
      },
    );
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as {
      id: number;
    };

    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "REFRESH_EXPIRED",
      },
      {
        status: 401,
      },
    );
  }
}
