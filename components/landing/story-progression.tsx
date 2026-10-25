import React from "react"
import {
  CalendarClock,
  Mail,
  MessageSquareWarning,
  AlertCircle,
  Link2,
  Paperclip,
  Hash,
  Video,
  Clock,
  MessagesSquare,
  TrendingDown,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StoryProgression() {
  const steps = [
    {
      day: "Day 01",
      badge: "Optimistic",
      badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
      dotClass: "bg-emerald-500",
      title: "The Staging Link",
      icon: CalendarClock,
      description: "You share the latest build on Friday afternoon. The client is excited to take a look.",
      artifact: {
        icon: Link2,
        label: "preview-v2.client.com",
        color: "text-emerald-600 dark:text-emerald-400",
      },
      quote: "“Looks gorgeous overall! Just have a few small thoughts.”",
    },
    {
      day: "Day 03",
      badge: "Context Lost",
      badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
      dotClass: "bg-amber-500",
      title: "The 14-Bullet Email",
      icon: Mail,
      description: "A giant email arrives with vague notes and 4 unnamed screenshot attachments.",
      artifact: {
        icon: Paperclip,
        label: "Screenshot_at_4.12.png",
        color: "text-amber-600 dark:text-amber-400",
      },
      quote: "“Can we make that one button a bit bigger on mobile?”",
    },
    {
      day: "Day 05",
      badge: "Momentum Halted",
      badgeClass: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/25",
      dotClass: "bg-orange-500",
      title: "Detective Mode",
      icon: MessageSquareWarning,
      description: "18 Slack messages trying to guess the button, page, viewport width, and browser.",
      artifact: {
        icon: Hash,
        label: "#client-feedback (18 replies)",
        color: "text-orange-600 dark:text-orange-400",
      },
      quote: "“Wait, did they mean the navbar CTA or the footer?”",
    },
    {
      day: "Day 07",
      badge: "Launch Delayed",
      badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25",
      dotClass: "bg-rose-500",
      title: "The Missed Deadline",
      icon: AlertCircle,
      description: "A week lost to clarification for what was 15 minutes of straightforward CSS.",
      artifact: {
        icon: Video,
        label: "Emergency Alignment Zoom",
        color: "text-rose-600 dark:text-rose-400",
      },
      quote: "“Let's schedule another Zoom to walk through it together.”",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6 max-w-[1240px] mx-auto border-t border-border relative">
      {/* Eyebrow and Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 shadow-[rgba(0,0,0,0.02)_0px_1px_2px_0px]">
          <Sparkles className="size-3.5 text-foreground" />
          <span>The Pain of Modern Website Reviews</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Website feedback shouldn&apos;t feel like detective work.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          When review cycles rely on scattered screenshots and long email threads, simple fixes turn into days of lost momentum.
        </p>
      </div>

      {/* Narrative Progression Grid with subtle connector track */}
      <div className="relative">
        {/* Subtle connecting progression track behind cards on desktop */}
        <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-emerald-500/25 via-amber-500/25 to-rose-500/30 -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon
            const ArtifactIcon = step.artifact.icon
            return (
              <Card
                key={step.day}
                className="relative border-border bg-card/75 hover:bg-card hover:border-foreground/25 hover:-translate-y-1 hover:shadow-[rgba(0,0,0,0.05)_0px_12px_28px_0px] transition-all duration-200 flex flex-col justify-between group rounded-2xl"
              >
                <CardContent className="p-5 sm:p-6 flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-3.5">
                    {/* Step Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted border border-border/70 text-[11px] font-mono font-medium text-foreground">
                        <span className={cn("size-1.5 rounded-full", step.dotClass)} />
                        {step.day}
                      </div>
                      <Badge variant="pill" className={cn("text-[10px] py-0 font-medium", step.badgeClass)}>
                        {step.badge}
                      </Badge>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="size-8 rounded-[6px] bg-muted border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="size-4 text-foreground" />
                      </div>
                      <h3 className="font-heading text-base sm:text-lg font-semibold tracking-tight text-foreground leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    {/* Shortened, punchy description */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {/* Relatable Context Artifact Pill */}
                    <div className="px-2.5 py-1.5 rounded-lg bg-muted/60 border border-border/80 flex items-center gap-2 text-[11px] font-mono text-foreground/80">
                      <ArtifactIcon className={cn("size-3.5 shrink-0", step.artifact.color)} />
                      <span className="truncate">{step.artifact.label}</span>
                    </div>

                    {/* Simulated quote bubble */}
                    <div className="p-2.5 rounded-lg bg-background/80 border border-border/70 text-[11px] font-mono text-foreground/75 italic leading-snug">
                      {step.quote}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Summary Impact Pill */}
      <div className="mt-14 max-w-3xl mx-auto rounded-2xl border border-border bg-card p-6 shadow-[rgba(0,0,0,0.03)_0px_8px_24px_0px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
              <Clock className="size-3.5" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Time Lost</span>
            </div>
            <div className="font-heading text-3xl font-semibold tracking-[-1px] text-foreground mb-1">
              4.2 hrs
            </div>
            <p className="text-xs text-muted-foreground">Wasted per review round</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
              <MessagesSquare className="size-3.5" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Back-and-Forth</span>
            </div>
            <div className="font-heading text-3xl font-semibold tracking-[-1px] text-foreground mb-1">
              6+ msgs
            </div>
            <p className="text-xs text-muted-foreground">To clarify a single visual bug</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
              <TrendingDown className="size-3.5" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Timeline Drag</span>
            </div>
            <div className="font-heading text-3xl font-semibold tracking-[-1px] text-foreground mb-1">
              38%
            </div>
            <p className="text-xs text-muted-foreground">Longer client sign-off cycles</p>
          </div>
        </div>
      </div>
    </section>
  )
}
