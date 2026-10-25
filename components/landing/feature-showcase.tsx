import {
  MousePointerClick,
  Layers,
  Camera,
  Smartphone,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeatureShowcase() {
  const features = [
    {
      icon: MousePointerClick,
      title: "Element-Relative Percentage Pins",
      badge: "Anti-Drift Math",
      description:
        "Unlike basic screenshot tools that save fragile X/Y pixel coordinates, Annotly calculates element-relative percentages ($OffsetX = \\frac{clickX - rect.left}{rect.width} \\times 100$) and records 5-tier resilient CSS selectors. Pins stay locked to the element when screen widths resize, fonts load, or columns stack.",
      highlight: "Guaranteed alignment across dynamic viewports",
    },
    {
      icon: Layers,
      title: "Zero-Install Guest Mode",
      badge: "Frictionless Access",
      description:
        "Clients will not install Chrome extensions or memorize another password. Reviewers simply open your secret link, enter their name and email, and start clicking anywhere to leave feedback immediately. No friction, no onboarding drop-off.",
      highlight: "Clients comment in seconds without accounts",
    },
    {
      icon: Camera,
      title: "Sub-500ms In-Browser Snapshots",
      badge: "HTML5 Canvas",
      description:
        "At the exact moment a pin is placed, Annotly generates a fast client-side canvas rasterization of the reviewer's screen. If a bug is intermittent or viewport-specific, developers see the exact rendered state without slow server-side queue delays.",
      highlight: "Instant visual snapshot attached to each pin",
    },
    {
      icon: Smartphone,
      title: "Unified Multi-Device Viewports",
      badge: "Desktop • Tablet • Mobile",
      description:
        "Switch effortlessly between 1440px desktop, 768px tablet, and 375px mobile viewports directly within the canvas. Test and annotate responsive layout bugs, mobile hamburger menus, and reflowing text columns in one unified place.",
      highlight: "Inspect and annotate every responsive breakpoint",
    },
  ]

  return (
    <section id="features" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <Sparkles className="size-3.5 text-foreground" />
          <span>Engineered for Precision</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Built specifically for how modern websites are engineered.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          No toy screen recorders. No fragile absolute pixels. Built with deep DOM intelligence to handle responsive layouts and real staging environments.
        </p>
      </div>

      {/* 2x2 Rich Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feat) => {
          const Icon = feat.icon
          return (
            <Card
              key={feat.title}
              className="border-border bg-card/70 hover:bg-card transition-all hover:shadow-[rgba(0,0,0,0.04)_0px_8px_24px_0px] flex flex-col justify-between"
            >
              <CardHeader className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-11 rounded-[6px] bg-muted border border-border flex items-center justify-center shadow-xs">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <Badge variant="pill" className="text-[11px] font-normal py-0.5">
                    {feat.badge}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-semibold tracking-tight text-foreground mb-2">
                  {feat.title}
                </CardTitle>

                <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{feat.highlight}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
