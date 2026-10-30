import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SectionHeader() {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <Badge variant="pill" className="mb-4 h-auto gap-1.5 px-3 py-1 text-muted-foreground">
        <Sparkles className="text-foreground" />
        <span>The Annotly Workflow</span>
      </Badge>
      <h2 className="mb-4 font-heading text-3xl leading-tight font-semibold tracking-[-1.2px] text-foreground sm:text-4xl md:text-5xl">
        From vague comments to crystal-clear feedback.
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
        A frictionless 3-step loop turning scattered comments into precise, element-anchored tasks.
      </p>
    </div>
  )
}
