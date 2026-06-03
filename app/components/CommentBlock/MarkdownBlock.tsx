import { Toggle } from "@/schadComponents/ui/toggle";
import { BoldIcon, ItalicIcon } from "lucide-react";

interface IMarkdownBlock {
  className?: string;
}

function MarkdownBlock({ className }: IMarkdownBlock) {
  return (
    <div className={` ${className}`}>
      <Toggle size="sm">
        <ItalicIcon />
        <p>Italic</p>
      </Toggle>
      <Toggle size="sm">
        <BoldIcon />
        <p>Bold</p>
      </Toggle>
    </div>
  );
}

export default MarkdownBlock;
