import { Dialog, DialogTrigger } from "@/schadComponents/ui/dialog";
import { DeleteIcon, Plus, TrashIcon } from "lucide-react";
import EditListItemPopUp from "./EditListItemPopUp";
import { Button } from "@/schadComponents/ui/button";
import { Input } from "@/schadComponents/ui/input";
import { Checkbox } from "@/schadComponents/ui/checkbox";
import { Badge } from "@/schadComponents/ui/badge";
import { useState } from "react";

interface TaskListItemProps {
  id: string;
  title: string;
  priority: string;
}
const priorityStyles: Record<string, string> = {
  HIGH: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  MEDIUM:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  LOW: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};
function TaskListItem(props: TaskListItemProps) {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { title, priority } = props;

  function deleteListItem(id: string) {}
  return (
    <>
      <EditListItemPopUp>
        <li className="flex items-center justify-between border py-3 px-3 cursor-pointer hover:bg-muted/50 transition rounded-xl">
          <div className="flex gap-3">
            <Checkbox
              onClick={(e) => e.stopPropagation()}
              checked={isComplete}
              onCheckedChange={(checked) => {
                setIsComplete(checked === true);
              }}
            />

            <p>{title}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Badge className={priorityStyles[priority]}>{priority}</Badge>
            {isComplete && (
              <Button
                type="button"
                size="icon-xs"
                variant="destructive"
                onClick={(e) => e.stopPropagation()}
              >
                <TrashIcon height={10} />
              </Button>
            )}
          </div>
        </li>
      </EditListItemPopUp>
    </>
  );
}

export default TaskListItem;
