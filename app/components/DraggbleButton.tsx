import { Button } from "@/schadComponents/ui/button";
import { useDraggable } from "@dnd-kit/react";
import { GripVertical } from "lucide-react";

function DraggbleButton() {
  const { ref } = useDraggable({
    id: "draggable",
  });
  return (
    <>
      <Button ref={ref} type="button" size="icon">
        <GripVertical />
      </Button>
    </>
  );
}
export default DraggbleButton;
