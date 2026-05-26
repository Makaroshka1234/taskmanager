"use client";
import { Card, CardContent } from "@/schadComponents/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/schadComponents/ui/dialog";
import CreateBoardForm from "./CreateBoardForm";
import { useState } from "react";

function CreateBoard() {
  const [open, setOpen] = useState(false);
  return (
    <li className="w-60 flex-shrink-0 ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="flex items-center justify-center"
          // onClick={() => setOpen(true)}
          asChild
        >
          <Card className="w-60 h-32 cursor-pointer hover:bg-muted transition">
            <CardContent className="flex items-center justify-center text-center ">
              <span className="text-muted-foreground text-sm text-center">
                + Create board
              </span>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="mx-auto w-full max-w-xl py-10">
          <CreateBoardForm open={open} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </li>
  );
}
export default CreateBoard;
