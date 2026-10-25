import React from "react"
import { AlertCircle, Mail, MessageSquareWarning, CalendarClock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function StoryProgression() {
  const steps = [
    {
      day: "Day 1",
      title: "The Staging Launch",
      badge: "High Enthusiasm",
      badgeVariant: "outline" as const,
      icon: CalendarClock,
      description:
        "You send the client a staging link on Friday afternoon: 'Here is the latest preview build! Take a spin and let us know what you think.' Everyone is optimistic.",
      dialogue: "“Looks gorgeous overall! Just have a few small thoughts over the weekend.”",
    },
    {
      day: "Day 3",
      title: "The 14-Bullet Email",
      badge: "Context Lost",
      badgeVariant: "default" as const,
      icon: Mail,
      description:
        "An email arrives with 14 vague bullet points and 4 unnamed attachments like 'Screen Shot 2024-03-12 at 4.12.33 PM.png'. No URLs, no viewport dimensions, no browser details.",
      dialogue: "“Can we make that one button a bit bigger and fix the spacing on mobile?”",
    },
    {
      day: "Day 5",
      title: "Detective Mode",
      badge: "Momentum Halted",
      badgeVariant: "default" as const,
      icon: MessageSquareWarning,
      description:
        "Now your team is playing detective across 18 Slack messages: Which button did they mean? The navbar CTA or the footer? Were they on an iPhone or an iPad? Which breakpoint?",
      dialogue: "“Hey, do you know what screen they meant by 'the third page'?”",
    },
    {
      day: "Day 7",
      title: "The Missed Deadline",
      badge: "Launch Delayed",
      badgeVariant: "outline" as const,
      icon: AlertCircle,
      description:
        "What should have been 20 minutes of CSS tweaks has cost a week of momentum, three awkward clarification calls, and client frustration before launch.",
      dialogue: "“Let's schedule another Zoom to walk through the website together next Tuesday.”",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow and Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <span>The Pain of Modern Website Reviews</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Website feedback shouldn&apos;t feel like detective work.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          When review cycles rely on scattered screenshots and long email threads, simple fixes turn into days of lost momentum.
        </p>
      </div>

      {/* Narrative Progression Grid (Aviary-style day-by-day story) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <Card
              key={step.day}
              className="relative border-border bg-card/60 hover:bg-card transition-colors flex flex-col justify-between"
            >
              <CardContent className="p-6 flex flex-col h-full justify-between">
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                      {step.day}
                    </span>
                    <Badge variant="pill" className="text-[10px] py-0">
                      {step.badge}
                    </Badge>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="size-8 rounded-[6px] bg-muted border border-border flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Simulated quote bubble */}
                <div className="p-2.5 rounded-lg bg-muted/60 border border-border/80 text-[11px] font-mono text-foreground/80 italic leading-snug">
                  {step.dialogue}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Impact Pill */}
      <div className="mt-12 p-4 rounded-xl border border-border bg-muted/40 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
        <div>
          <div className="font-heading text-2xl font-semibold tracking-[-0.9px] text-foreground">4.2 hrs</div>
          <div className="text-xs text-muted-foreground">Wasted per review round</div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-border" />
        <div>
          <div className="font-heading text-2xl font-semibold tracking-[-0.9px] text-foreground">6+ msgs</div>
          <div className="text-xs text-muted-foreground">To clarify a single visual bug</div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-border" />
        <div>
          <div className="font-heading text-2xl font-semibold tracking-[-0.9px] text-foreground">38%</div>
          <div className="text-xs text-muted-foreground">Longer client sign-off cycles</div>
        </div>
      </div>
    </section>
  )
}
