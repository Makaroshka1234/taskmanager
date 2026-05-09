"use client";

import TaskList from "./TaskList";
import { useBoard } from "@/app/hooks/useBoard";

interface IBoardprops {
  id: string;
}
function Board(props: IBoardprops) {
  const { id } = props;
  const { board, loading, error } = useBoard(id);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!board) return null;
  return (
    <section className="board flex gap-3">
      {board.boardLists.map((list) => (
        <TaskList key={list.id} {...list} />
      ))}
    </section>
  );
}

export default Board;
