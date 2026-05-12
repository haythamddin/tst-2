import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  content: string;
  className?: string;
}

export default function InfoTooltip({ content, className }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Info className={`h-4 w-4 text-muted-foreground hover:text-primary cursor-help transition-colors ${className}`} />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-slate-900 text-white border-slate-800">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
