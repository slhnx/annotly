import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScrollArrowsProps {
  canScrollLeft: boolean
  canScrollRight: boolean
  onScroll: (direction: "left" | "right") => void
}

const ARROW_BUTTON_CLASS =
  "size-11 border-border bg-card shadow-xs hover:bg-muted active:scale-95 disabled:opacity-40 disabled:shadow-none sm:size-12"

export function ScrollArrows({
  canScrollLeft,
  canScrollRight,
  onScroll,
}: ScrollArrowsProps) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 self-start pt-2 md:self-end">
      <Button
        type="button"
        variant="outline"
        size="icon-pill"
        onClick={() => onScroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={ARROW_BUTTON_CLASS}
      >
        <ArrowLeft className="size-5" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-pill"
        onClick={() => onScroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={ARROW_BUTTON_CLASS}
      >
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
