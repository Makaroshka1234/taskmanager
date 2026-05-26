import { useBoardStore } from "@/app/store/useBoardStore";
import { Button } from "@/schadComponents/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/schadComponents/ui/dropdown-menu";
import { DeleteIcon, EllipsisVerticalIcon } from "lucide-react";

interface IDeleteDropDownProps {
  listId: string;
}

function DeleteDropDown(props: IDeleteDropDownProps) {
  const { listId } = props;
  const { deleteTaskList } = useBoardStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button
                type="button"
                variant="destructive"
                className=""
                onClick={() => deleteTaskList(listId)}
              >
                <p>Delete list</p>
                <DeleteIcon />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DeleteDropDown;
