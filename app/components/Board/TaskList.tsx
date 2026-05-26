import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import TaskListItem from "./TaskListItem";
import AddTaskListItem from "./AddTaskListItem";
import DeleteDropDown from "../BoardList/DeleteDropDown";

type BoardList = {
  id: string;
  title: string;
  tasks: Task[];
};
type Task = {
  id: string;
  title: string;
  priority: string;
};

function TaskList(props: BoardList) {
  const { title, id, tasks } = props;
  return (
    <Card size="default" className="min-w-sm max-w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <DeleteDropDown listId={id} />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {tasks?.map((task) => (
          <TaskListItem key={task.id} {...task} />
        ))}
        <AddTaskListItem boardListId={id} />
      </CardContent>
    </Card>
  );
}

export default TaskList;
