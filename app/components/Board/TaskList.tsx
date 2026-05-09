import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import TaskListItem from "./TaskListItem";

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
  const { tasks, title } = props;
  return (
    <Card size="default" className="w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p>create task</p>
        ) : (
          tasks?.map((task) => <TaskListItem key={task.id} />)
        )}
      </CardContent>
    </Card>
  );
}

export default TaskList;
