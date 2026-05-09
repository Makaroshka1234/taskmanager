"use client";

import { Input } from "@/schadComponents/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/schadComponents/ui/resizable";
import { useState } from "react";

function Res() {
  const [taskTitle, setTaskTitle] = useState("sfsdsdsdd");
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px]  rounded-lg border flex-1  w-full"
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
              <input type="checkbox" name="todo-checkbox" id="todo-checkbox" />
              <Input className="border-none" defaultValue={taskTitle} />
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle onPointerDown={(e) => e.stopPropagation()} />
      <ResizablePanel id="content-panel" defaultSize="75%" minSize="30%">
        <div
          className="flex h-full items-center justify-center p-6"
          onDoubleClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Res;
