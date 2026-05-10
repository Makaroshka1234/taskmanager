import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import TaskListItem from "./TaskListItem";
import AddTaskListItem from "./AddTaskListItem";

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
  const { tasks, title, id } = props;
  return (
    <Card size="default" className="min-w-sm max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
