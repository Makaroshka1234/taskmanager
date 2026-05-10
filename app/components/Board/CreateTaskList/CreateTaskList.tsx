import { Card, CardContent } from "@/schadComponents/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/schadComponents/ui/dialog";
import CreateTaskListForm from "./CreateTaskListFrom";

function CreateTaskList({ boardId }: { boardId: string }) {
  return (
    <li className="w-60 flex-shrink-0 ">
      <Dialog>
        <DialogTrigger className="flex items-center justify-center" asChild>
          <Card className="w-60 h-32 cursor-pointer hover:bg-muted transition">
            <CardContent className="flex items-center justify-center text-center ">
              <span className="text-muted-foreground text-sm text-center">
                + Create TaskList
              </span>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="mx-auto w-full max-w-xl py-10">
          <CreateTaskListForm boardId={boardId} />
        </DialogContent>
      </Dialog>
    </li>
  );
}
export default CreateTaskList;
