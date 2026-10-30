import { Badge } from "@/components/ui/badge"
import { ReplayButton } from "../before-after/replay-button"
import { StatusDot } from "../before-after/status-dot"

interface StageHeaderProps {
  chapterTitle: string
  isCompleted: boolean
  isHovered: boolean
  onReplay: () => void
}

export function StageHeader({ chapterTitle, isCompleted, isHovered, onReplay }: StageHeaderProps) {
  const slug = chapterTitle.toLowerCase().replace(/\s+/g, "_")

  return (
    <div className="flex items-center justify-between border-b border-foreground/10 pb-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2 truncate font-mono text-[11px]">
        <StatusDot isCompleted={isCompleted} isHovered={isHovered} className="size-2 shrink-0" />
        <span className="truncate">annotly_bridge://interactive_demo/{slug}</span>
      </div>
      <div className="flex items-center gap-2">
        <ReplayButton
          onClick={onReplay}
          title="Replay interactive demo from beginning"
          className="h-5 px-2.5 text-[10px] [&_svg]:size-2.5"
        />
        <Badge variant="muted" className="shrink-0 font-mono text-[10px] text-foreground">
          Live Inspector
        </Badge>
      </div>
    </div>
  )
}
