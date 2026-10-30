import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReplayButtonProps {
  onClick: () => void
  title: string
  className?: string
}

export function ReplayButton({ onClick, title, className }: ReplayButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      title={title}
      className={cn(
        "h-6 gap-1.5 rounded-full border-border bg-muted px-3 font-mono text-[11px] text-foreground/90 hover:text-foreground",
        className
      )}
    >
      <RotateCcw className="size-3" />
      <span>Replay</span>
    </Button>
  )
}
