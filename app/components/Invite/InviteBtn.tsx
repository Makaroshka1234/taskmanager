import { Badge } from "@/schadComponents/ui/badge";
import { Button } from "@/schadComponents/ui/button";
import { BellRing } from "lucide-react";

function InviteBtn() {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="rounded-none bg-transparent border-none cursor-pointer "
      asChild
    >
      <BellRing />
    </Button>
  );
}

export default InviteBtn;
