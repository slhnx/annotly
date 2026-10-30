import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type MobileTab = "without" | "with"

interface SectionHeaderProps {
  mobileTab: MobileTab
  onMobileTabChange: (tab: MobileTab) => void
}

const triggerClassName =
  "rounded-full px-4 py-1.5 text-xs data-active:bg-primary data-active:font-semibold data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground"

export function SectionHeader({ mobileTab, onMobileTabChange }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Badge variant="pill" className="mb-4 h-auto gap-1.5 px-3 py-1 text-muted-foreground">
        <Sparkles />
        <span>The Real-World Difference</span>
      </Badge>
      <h2 className="mb-4 font-heading text-3xl leading-tight font-semibold tracking-[-1.2px] text-foreground sm:text-4xl md:text-5xl">
        Clear visual context vs. endless guessing.
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
        A vague Slack comment wastes 3 days of back-and-forth. An element-anchored pin fixes it in 30 seconds.
      </p>

      {/* Mobile-only toggle between the two comparison panels */}
      <Tabs
        value={mobileTab}
        onValueChange={(value) => onMobileTabChange(value as MobileTab)}
        className="mt-6 items-center md:hidden"
      >
        <TabsList className="h-auto rounded-full border border-border p-1">
          <TabsTrigger value="without" className={triggerClassName}>
            Without Annotly
          </TabsTrigger>
          <TabsTrigger value="with" className={triggerClassName}>
            With Annotly
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
