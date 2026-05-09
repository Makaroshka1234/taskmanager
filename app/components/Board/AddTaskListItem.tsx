import { Plus } from "lucide-react"
function AddTaskListItem() {
  return (
    <li>
      <div className="flex gap-2">
        <Plus />
        <p>Add Card</p>
      </div>
    </li>
  );
}
export default AddTaskListItem;
