import type { KeyboardEvent } from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GrainOverlay } from "../before-after/grain-overlay"
import { StatusDot } from "../before-after/status-dot"
import type { Chapter } from "./chapters.data"

interface ChapterCardProps {
  chapter: Chapter
  isActive: boolean
  isCompleted: boolean
  isHovered: boolean
  progress: number
  onSelect: () => void
}

function ChapterProgress({
  chapter,
  isCompleted,
  isHovered,
  progress,
}: Pick<ChapterCardProps, "chapter" | "isCompleted" | "isHovered" | "progress">) {
  const statusLabel = isCompleted
    ? "Demo Completed"
    : isHovered
      ? "Paused (Hovered)"
      : `Point ${chapter.step} of 03`

  return (
    <div className="space-y-1.5 pt-2">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <StatusDot isCompleted={isCompleted} isHovered={isHovered} className="size-1.5" />
          {statusLabel}
        </span>
        <span>{isCompleted ? "100%" : `${Math.round(progress)}%`}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-75 ease-linear",
            isCompleted ? "bg-success" : "bg-primary"
          )}
          style={{ width: isCompleted ? "100%" : `${progress}%` }}
        />
      </div>
    </div>
  )
}

/** Selectable chapter summary; the active card shows live demo progress. */
export function ChapterCard({ chapter, isActive, onSelect, ...progressState }: ChapterCardProps) {
  const Icon = chapter.icon

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect()
    }
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative cursor-pointer gap-0 rounded-[22px] bg-secondary p-5 text-foreground transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:rounded-[26px] sm:p-6",
        isActive
          ? "-translate-y-0.5 border-border-interactive opacity-100 shadow-card"
          : "border-foreground/10 opacity-70 hover:-translate-y-0.5 hover:border-border-interactive/50 hover:opacity-95"
      )}
    >
      <GrainOverlay className="opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay" />

      <div className="relative z-10 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Badge variant="outline" className="font-mono font-semibold text-foreground">
              {chapter.step}
            </Badge>
            <h3 className="font-sans text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {chapter.title}
            </h3>
          </div>
          {isActive ? (
            <Badge className="py-0 text-[10px]">
              {progressState.isCompleted ? "Completed" : "Active Demo"}
            </Badge>
          ) : (
            <span className="font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
              Step {chapter.step}
            </span>
          )}
        </div>

        <p className="text-xs leading-relaxed font-normal text-foreground/80 sm:text-sm">
          {chapter.description}
        </p>

        {isActive && <ChapterProgress chapter={chapter} {...progressState} />}

        {isActive && (
          <div className="flex items-center justify-between border-t border-foreground/10 pt-2 text-xs font-medium text-foreground">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <Icon className="size-3.5 shrink-0 text-foreground" />
              {chapter.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-0.5">
              Explore details <ArrowRight className="size-3" />
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
