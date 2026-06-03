"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/schadComponents/ui/dialog";

import { Props } from "next/script";
import Res from "./Res";

function EditListItemPopUp({ children }: Props) {
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
