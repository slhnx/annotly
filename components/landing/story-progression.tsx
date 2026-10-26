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
import { cn } from "@/lib/utils"

export function StoryProgression() {
  const steps = [
    {
      day: "Day 01",
      badge: "Optimistic",
      badgeClass:
        "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/25",
      dotClass: "bg-emerald-600 dark:bg-emerald-400",
      title: "The Staging Link",
      icon: CalendarClock,
      description:
        "You send the build on Friday afternoon. The client is excited to review.",
      artifact: {
        icon: Link2,
        label: "staging-v2.client.com",
        meta: "v2.4.0",
        color: "text-emerald-600 dark:text-emerald-400",
      },
      quote: "Looks gorgeous overall! Just have a few small thoughts.",
    },
    {
      day: "Day 03",
      badge: "Context Lost",
      badgeClass:
        "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/25",
      dotClass: "bg-amber-600 dark:bg-amber-400",
      title: "The 14-Bullet Email",
      icon: Mail,
      description:
        "A long email arrives with vague notes and four unnamed screenshots.",
      artifact: {
        icon: Paperclip,
        label: "IMG_4912_screen.png",
        meta: "4 files",
        color: "text-amber-600 dark:text-amber-400",
      },
      quote: "Can we make that one button a bit bigger on mobile?",
    },
    {
      day: "Day 05",
      badge: "Momentum Halted",
      badgeClass:
        "bg-orange-500/15 text-orange-800 dark:text-orange-300 border-orange-500/25",
      dotClass: "bg-orange-600 dark:bg-orange-400",
      title: "Detective Mode",
      icon: MessageSquareWarning,
      description:
        "18 Slack messages trying to guess the exact button, page, and viewport.",
      artifact: {
        icon: Hash,
        label: "#client-feedback",
        meta: "18 replies",
        color: "text-orange-600 dark:text-orange-400",
      },
      quote: "Wait, did they mean the header CTA or the footer button?",
    },
    {
      day: "Day 07",
      badge: "Launch Delayed",
      badgeClass:
        "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/25",
      dotClass: "bg-rose-600 dark:bg-rose-400",
      title: "The Missed Deadline",
      icon: AlertCircle,
      description:
        "A full week lost clarifying 15 minutes of straightforward CSS fixes.",
      artifact: {
        icon: Video,
        label: "Emergency Alignment Call",
        meta: "45 mins",
        color: "text-rose-600 dark:text-rose-400",
      },
      quote: "Let's hop on another Zoom to walk through it together.",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 max-w-[1240px] mx-auto border-t border-border relative"
    >
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

      {/* Big 2x2 Accent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {steps.map((step) => {
          const Icon = step.icon
          const ArtifactIcon = step.artifact.icon
          return (
            <div
              key={step.day}
              className="group relative rounded-[28px] sm:rounded-[32px] bg-[#ede7dc] dark:bg-[#201f1d] text-foreground overflow-hidden p-7 sm:p-9 flex flex-col justify-between border border-foreground/[0.06] dark:border-white/[0.06] shadow-none hover:shadow-[0_12px_36px_rgba(28,28,28,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Tactile Noisy Grain Texture Overlay (same as features card) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Card Header & Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top Day Badge & Status Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] border border-foreground/[0.08] dark:border-white/10 text-xs font-mono font-semibold text-foreground tracking-wide">
                      <span className={cn("size-2 rounded-full", step.dotClass)} />
                      <span>{step.day}</span>
                    </div>
                    <div
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border font-mono",
                        step.badgeClass
                      )}
                    >
                      {step.badge}
                    </div>
                  </div>

                  {/* Icon & Big Heading */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="size-12 rounded-[10px] bg-foreground/[0.06] dark:bg-white/[0.08] border border-foreground/[0.08] dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="size-6 text-foreground" />
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-[-0.6px] text-foreground leading-tight">
                        {step.title}
                      </h3>
                    </div>

                    {/* Shortened, punchy description with big text */}
                    <p className="text-sm sm:text-base text-foreground/80 dark:text-[#eceae4]/80 leading-relaxed font-normal pt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Relatable Context Artifact Pill & Quote Bubble */}
                <div className="space-y-3 pt-4 border-t border-foreground/[0.08] dark:border-white/10">
                  <div className="px-3.5 py-2.5 rounded-xl bg-foreground/[0.05] dark:bg-white/[0.05] border border-foreground/[0.08] dark:border-white/10 flex items-center justify-between gap-3 text-xs font-mono text-foreground/85">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ArtifactIcon
                        className={cn("size-4 shrink-0", step.artifact.color)}
                      />
                      <span className="truncate font-medium">
                        {step.artifact.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground/50 shrink-0 font-sans">
                      {step.artifact.meta}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-background/80 dark:bg-black/35 backdrop-blur-xs border border-foreground/[0.08] dark:border-white/10 text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed shadow-xs flex items-start gap-2.5">
                    <span className="text-foreground/40 text-lg leading-none select-none font-serif">
                      “
                    </span>
                    <span className="flex-1 italic">
                      {step.quote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Impact Pill */}
      <div className="mt-14 max-w-4xl mx-auto rounded-[24px] sm:rounded-[28px] bg-[#ede7dc] dark:bg-[#201f1d] border border-foreground/[0.06] dark:border-white/[0.06] p-7 sm:p-9 relative overflow-hidden shadow-none">
        {/* Tactile Noisy Grain Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-foreground/10 dark:divide-white/10">
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center gap-1.5 text-foreground/60 mb-2">
              <Clock className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                Time Lost
              </span>
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1">
              4.2 hrs
            </div>
            <p className="text-xs sm:text-sm text-foreground/70">Wasted per review round</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-5 sm:pt-0">
            <div className="flex items-center gap-1.5 text-foreground/60 mb-2">
              <MessagesSquare className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                Back-and-Forth
              </span>
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1">
              6+ msgs
            </div>
            <p className="text-xs sm:text-sm text-foreground/70">To clarify a single visual bug</p>
          </div>

          <div className="flex flex-col items-center text-center px-4 pt-5 sm:pt-0">
            <div className="flex items-center gap-1.5 text-foreground/60 mb-2">
              <TrendingDown className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                Timeline Drag
              </span>
            </div>
            <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1">
              38%
            </div>
            <p className="text-xs sm:text-sm text-foreground/70">Longer client sign-off cycles</p>
          </div>
        </div>
      </div>
    </section>
  )
}

