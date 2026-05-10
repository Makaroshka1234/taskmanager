import { Badge } from "@/schadComponents/ui/badge";
import { DropdownMenuRadioItem } from "@/schadComponents/ui/dropdown-menu";

interface Priority {
  value: string;
  color: string;
}

interface PriorityListProps {
  prioryties: Priority[];
}
const priorityStyles: Record<string, string> = {
  red: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  yellow:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  green: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};
function PriorityList(props: PriorityListProps) {
  const { prioryties } = props;
  return (
    <ul>
      {prioryties.map((val) => (
        <DropdownMenuRadioItem key={val.value} value={val.value}>
          <Badge className={priorityStyles[val.color]}>{val.value}</Badge>
        </DropdownMenuRadioItem>
      ))}
    </ul>
  );
}

export default PriorityList;
