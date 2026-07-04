import Board from "@/app/components/Board/Board";
import BoardPopOver from "@/app/components/Board/BoardPopOver";
import InvitePopUp from "@/app/components/InvitePopUp";
import { Button } from "@/schadComponents/ui/button";
import { Ellipsis, UserRoundPlus } from "lucide-react";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="flex-1 min-h-0">
      <Board id={id} />
    </section>
  );
}
