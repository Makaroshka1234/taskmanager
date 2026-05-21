import { Button } from "@/schadComponents/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/schadComponents/ui/popover";

type Props = {
  children: React.ReactNode;
};

function BoardPopOver({ children }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Меню</PopoverHeader>
        <Button>
            
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default BoardPopOver;
