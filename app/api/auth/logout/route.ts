import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Logged out",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token =; HttpOnly; Path=/; Max-age=0; SameSite=Lax",
      },
    },
  );
}
