import Board from "@/app/components/Board/Board";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="boardPage">
      <h2 className="board-title"></h2>
      <Board id={id} />
    </section>
  );
}
