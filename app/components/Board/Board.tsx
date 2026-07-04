"use client";

import { Ellipsis, UserRoundPlus } from "lucide-react";
import CreateTaskList from "./CreateTaskList/CreateTaskList";
import TaskList from "./TaskList";
import { Button } from "@/schadComponents/ui/button";
import BoardPopOver from "./BoardPopOver";
import { useEffect } from "react";
import { useBoardGetTaskLists, useBoardStore } from "@/app/store/useBoardStore";
import InvitePopUp from "../InvitePopUp";
import InviteBtn from "../Invite/InviteBtn";
import InvitePopOver from "../Invite/InvitePopOver";

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
    <div className="h-full">
      <div className="py-3 px-5 flex items-center bg-board-header-bg justify-between w-full">
        <p className="board-title">{currentBoard.title}</p>
        <div className="gap-5 flex">
          <InvitePopOver>
            <InviteBtn />
          </InvitePopOver>

          <InvitePopUp>
            <div className="invite-btn flex gap-3 cursor-pointer rounded-xl py-2 text-white px-2 bg-black">
              <UserRoundPlus />
              Запросити
            </div>
          </InvitePopUp>

          <BoardPopOver boardId={id}>
            <Button type="button" className="bg-board-button-bg">
              <Ellipsis />
            </Button>
          </BoardPopOver>
        </div>
      </div>
      <section
        className="board  bg-cover bg-center bg-no-repeat overflow-auto h-full  "
        style={{
          backgroundColor: backgroundType === "COLOR" ? "red" : "gray",
          backgroundImage:
            backgroundType === "IMAGE"
              ? `url('${backgroundImageUrl}')`
              : undefined,
        }}
      >
        <ul className="flex gap-3 items-start  p-3 ">
          {boardLists?.map((list) => (
            <TaskList key={list.id} {...list} />
          ))}
          <CreateTaskList boardId={id} />
        </ul>
      </section>
    </div>
  );
}

export default Board;
