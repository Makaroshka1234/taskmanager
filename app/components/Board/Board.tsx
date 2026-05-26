"use client";

import { Ellipsis, UserRoundPlus } from "lucide-react";
import CreateTaskList from "./CreateTaskList/CreateTaskList";
import TaskList from "./TaskList";
import { Button } from "@/schadComponents/ui/button";
import BoardPopOver from "./BoardPopOver";
import { useEffect } from "react";
import { useBoardGetTaskLists, useBoardStore } from "@/app/store/useBoardStore";

interface IBoardprops {
  id: string;
}
function Board(props: IBoardprops) {
  const { id } = props;
  const { fetchBoard, loadingBoards, currentBoard } = useBoardStore();
  const boardLists = useBoardGetTaskLists();

  const backgroundImageUrl = useBoardStore(
    (state) => state.currentBoard?.backgroundImageUrl,
  );

  const backgroundType = useBoardStore(
    (state) => state.currentBoard?.backgroundType,
  );
  useEffect(() => {
    if (!id) return;

    fetchBoard(id);
  }, [id, fetchBoard]);
  if (loadingBoards) return <div>Loading...</div>;
  if (!currentBoard) return <div>Loadingаааа...</div>;
  return (
    <section
      className="board h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: backgroundType === "COLOR" ? "red" : "gray",
        backgroundImage:
          backgroundType === "IMAGE"
            ? `url('${backgroundImageUrl}')`
            : undefined,
      }}
    >
      <div className="py-3 px-5 flex items-center bg-gray-100 justify-between">
        <p className="board-title">{currentBoard.title}</p>
        <div className="gap-5 flex">
          <Button className="invite-btn" type="button">
            <UserRoundPlus />
            Запросити
          </Button>
          <BoardPopOver boardId={id}>
            <Button type="button">
              <Ellipsis />{" "}
            </Button>
          </BoardPopOver>
        </div>
      </div>
      <ul className="flex gap-3 ">
        {boardLists?.map((list) => (
          <TaskList key={list.id} {...list} />
        ))}
        <CreateTaskList boardId={id} />
      </ul>
    </section>
  );
}

export default Board;
