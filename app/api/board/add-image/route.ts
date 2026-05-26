import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { boardId, url } = await req.json();

  try {
    if (!boardId || !url) {
      return Response.json({ error: "Missing data" }, { status: 400 });
    }
    const board = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        uploadedImages: {
          push: url,
        },
      },
    });
    return Response.json(board);
  } catch (err) {
    return Response.json({ err: "DB update failed" }, { status: 500 });
  }
}
