import { DiagnosticsVisual } from "./diagnostics-visual"
import { ResolutionVisual } from "./resolution-visual"
import { SelectorVisual } from "./selector-visual"

const VISUALS = [SelectorVisual, DiagnosticsVisual, ResolutionVisual]

interface ChapterVisualProps {
  activeChapter: number
}

export function ChapterVisual({ activeChapter }: ChapterVisualProps) {
  const Visual = VISUALS[activeChapter]

  return (
    <div key={activeChapter} className="animate-in space-y-4 py-2 duration-300 fade-in">
      <Visual />
    </div>
  )
}
