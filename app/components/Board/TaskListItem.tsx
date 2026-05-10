import { Dialog, DialogTrigger } from "@/schadComponents/ui/dialog";
import { Plus } from "lucide-react";
import EditListItemPopUp from "./EditListItemPopUp";
import { Button } from "@/schadComponents/ui/button";

interface TaskListItemProps {
  id: string;
  title: string;
  priority: string;
}

function TaskListItem(props: TaskListItemProps) {
  const { title, priority } = props;
  return (
    <>
      <EditListItemPopUp>
        <Button>{title}</Button>
      </EditListItemPopUp>
      <p>{priority}</p>
    </> 
  );
}

export default TaskListItem;
