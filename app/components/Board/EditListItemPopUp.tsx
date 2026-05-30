"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/schadComponents/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/schadComponents/ui/resizable";
import { Props } from "next/script";
import Res from "./Res";
import { useBoardGetCurrentTask } from "@/app/store/useBoardStore";

function EditListItemPopUp({ children }: Props) {
  const curentTask = useBoardGetCurrentTask();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className=" sm:max-w-4xl sm:h-20xl ">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogClose />
        </DialogHeader>
        <Res />
      </DialogContent>
    </Dialog>
  );
}
export default EditListItemPopUp;
