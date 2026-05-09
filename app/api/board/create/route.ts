import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { title } = await req.json();
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = verifyAccessToken(token);

  const board = await prisma.board.create({
    data: {
      title: title,
      creatorId: user.userId,
      boardLists: {
        create: [
          {
            title: "To Do",
          },
          {
            title: "In Progress",
          },
          {
            title: "Done",
          },
        ],
      },
    },
    include: {
      boardLists: true,
    },
  });

  return Response.json({ board });
}
