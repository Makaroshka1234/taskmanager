"use client";

import { Ellipsis, UserRoundPlus } from "lucide-react";
import CreateTaskList from "./CreateTaskList/CreateTaskList";
import TaskList from "./TaskList";
import { useBoard } from "@/app/hooks/useBoard";
import { Button } from "@/schadComponents/ui/button";
import BoardPopOver from "./BoardPopOver";

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
    <section className="board ">
      <div className="py-3 px-5 flex items-center justify-between">
        <p className="board-title">Board-title</p>
        <div className="gap-5 flex">
          <Button className="invite-btn" type="button">
            <UserRoundPlus />
            Запросити
          </Button>
          <BoardPopOver>
            <Button type="button">
              <Ellipsis />{" "}
            </Button>
          </BoardPopOver>
        </div>
      </div>
      <ul className="flex gap-3 ">
        {board.boardLists.map((list) => (
          <TaskList key={list.id} {...list} />
        ))}
        <CreateTaskList boardId={id} />
      </ul>
    </section>
  );
}

export default Board;
