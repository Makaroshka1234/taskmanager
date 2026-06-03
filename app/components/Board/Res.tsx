"use client";

import {
  useBoardGetCurrentTask,
  useBoardUpdateTask,
} from "@/app/store/useBoardStore";
import { Input } from "@/schadComponents/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/schadComponents/ui/resizable";

import CommentBlock from "../CommentBlock/CommentBlock";

function Res() {
  const curentTask = useBoardGetCurrentTask();
  const uptadeTask = useBoardUpdateTask();

  function hadleChangeTitle(title: string) {
    uptadeTask(curentTask.boardListId, { ...curentTask, title: title });
  }
  function handleChangeCompleted() {
    uptadeTask(curentTask.boardListId, {
      ...curentTask,
      completed: !curentTask.completed,
    });
  }
  return (
    <div className="h-[400px] overflow-y-auto">
      <ResizablePanelGroup
        orientation="horizontal"
        className="  rounded-lg border flex-1  w-full"
        id="main-panel-group"
      >
        <ResizablePanel id="sidebar-panel" defaultSize="25%" minSize="30%">
          <div
            className="flex h-full  p-6"
            onDoubleClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="inner flex flex-col">
              <div className="task-inputs flex gap-2">
                <input
                  type="checkbox"
                  name="todo-checkbox"
                  id="todo-checkbox"
                  checked={curentTask.completed}
                  onChange={() => handleChangeCompleted()}
                />
                <Input
                  className="border-none"
                  defaultValue={curentTask.title}
                  onChange={(e) => hadleChangeTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          onPointerDown={(e) => e.stopPropagation()}
        />
        <ResizablePanel
          id="content-panel"
          className="max-h-full"
          defaultSize="75%"
          minSize="50%"
        >
          <div
            className="flex h-full "
            onDoubleClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <CommentBlock />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Res;
