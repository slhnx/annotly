import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselControlsProps {
  slideCount: number
  currentSlide: number
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

export function CarouselControls({
  slideCount,
  currentSlide,
  onSelect,
  onPrev,
  onNext,
}: CarouselControlsProps) {
  return (
    <div className="flex items-center gap-4 self-end pb-1 sm:self-auto">
      <div className="flex items-center gap-2">
        {Array.from({ length: slideCount }, (_, idx) => (
          <Button
            key={idx}
            type="button"
            variant="ghost"
            onClick={() => onSelect(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            aria-current={currentSlide === idx}
            className={cn(
              "h-2.5 rounded-full p-0 transition-all duration-300",
              currentSlide === idx
                ? "w-8 bg-foreground hover:bg-foreground"
                : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon-pill"
          onClick={onPrev}
          aria-label="Previous 3 cards"
          className="border-border bg-card shadow-xs hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-pill"
          onClick={onNext}
          aria-label="Next 3 cards"
          className="border-border bg-card shadow-xs hover:bg-muted"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
