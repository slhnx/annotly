"use client"

import React, { useState } from "react"
import {
  MousePointerClick,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Camera,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function WorkflowChapters() {
  const [activeChapter, setActiveChapter] = useState(0)

  const chapters = [
    {
      step: "01",
      title: "Point & Click Anchoring",
      subtitle: "Click directly on any element",
      description:
        "Reviewers click on any headline, image, or button. Annotly calculates element-relative percentage offsets and captures a 5-tier resilient CSS selector. The pin stays perfectly anchored even when screens resize or text wraps.",
      badge: "DOM Selector Precision",
      icon: MousePointerClick,
    },
    {
      step: "02",
      title: "Automatic Diagnostics",
      subtitle: "Zero technical back-and-forth",
      description:
        "Every comment automatically attaches the reviewer's exact viewport width, browser engine, operating system, device pixel ratio, and an instant client-side screenshot. No asking 'What phone were you using?' ever again.",
      badge: "Full Technical Context",
      icon: Cpu,
    },
    {
      step: "03",
      title: "One-Click Resolution",
      subtitle: "Track progress in real time",
      description:
        "Developers reply, discuss trade-offs in context, and mark issues resolved as fixes are pushed to staging. Staging links stay clutter-free and clients get instant visual confirmation that their feedback was implemented.",
      badge: "Inbox Zero on Staging",
      icon: CheckCircle2,
    },
  ]

  return (
    <section id="workflow" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow and Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <Sparkles className="size-3.5 text-foreground" />
          <span>The Annotly Workflow</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          From vague comments to crystal-clear feedback.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          A frictionless 3-step loop that turns scattered opinions into pinpointed, actionable tasks for your development team.
        </p>
      </div>

      {/* Aviary-Style Interactive Chaptered Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Chapter Selector */}
        <div className="lg:col-span-5 space-y-3">
          {chapters.map((ch, idx) => {
            const isActive = activeChapter === idx
            const Icon = ch.icon
            return (
              <div
                key={ch.step}
                onClick={() => setActiveChapter(idx)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? "bg-card border-foreground/40 shadow-[rgba(0,0,0,0.04)_0px_4px_16px_0px]"
                    : "bg-card/40 border-border hover:bg-card/80 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                      {ch.step}
                    </span>
                    <h3 className="font-heading font-semibold text-foreground text-base tracking-tight">
                      {ch.title}
                    </h3>
                  </div>
                  {isActive && (
                    <Badge variant="pill" className="text-[10px] py-0">
                      Active
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ch.description}
                </p>

                {isActive && (
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px] font-medium text-foreground">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Icon className="size-3.5 text-foreground" />
                      {ch.badge}
                    </span>
                    <span className="inline-flex items-center text-primary">
                      Explore details <ArrowRight className="size-3 ml-1" />
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Column: Dynamic Chapter Visual Showcase */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[rgba(0,0,0,0.04)_0px_8px_32px_0px] min-h-[420px] flex flex-col justify-between relative overflow-hidden">
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border text-xs text-muted-foreground">
              <span className="font-mono text-[11px]">
                annotly_bridge://interactive_demo/{chapters[activeChapter].title.toLowerCase().replace(/\s+/g, "_")}
              </span>
              <Badge variant="outline" className="text-[10px]">
                Live Inspector
              </Badge>
            </div>

            {/* Chapter 0 Visual: Element Selector Precision */}
            {activeChapter === 0 && (
              <div className="py-8 space-y-6 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 space-y-3 relative">
                  <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-[10px] font-mono px-2 py-0.5 rounded-[4px] shadow-sm flex items-center gap-1">
                    <span>button.btn-primary#hero-cta</span>
                    <span className="opacity-60">(X: 42.4%, Y: 68.1%)</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground text-sm">
                        Explore Our Architectural Portfolio
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Element coordinates locked to bounding client rect
                      </div>
                    </div>
                    <div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-md">
                      1
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-border bg-background">
                    <div className="font-mono text-[10px] text-muted-foreground mb-1">
                      Selector Hierarchy
                    </div>
                    <div className="font-mono text-[11px] text-foreground font-medium">
                      section.hero &gt; div &gt; button.cta
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-background">
                    <div className="font-mono text-[10px] text-muted-foreground mb-1">
                      Drift Resilience
                    </div>
                    <div className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Resize &amp; Reflow Safe
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1 Visual: Automatic Device Context */}
            {activeChapter === 1 && (
              <div className="py-6 space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl border border-border bg-background space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground border-b border-border pb-2">
                    <span>Auto-Captured Environment Diagnostics</span>
                    <span className="text-[10px] font-mono text-muted-foreground">ID: #ANN-8492</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                    <div className="p-2 rounded bg-muted/60 border border-border/80">
                      <div className="text-[10px] text-muted-foreground">Viewport</div>
                      <div className="font-semibold text-foreground">1440 × 900 px</div>
                    </div>
                    <div className="p-2 rounded bg-muted/60 border border-border/80">
                      <div className="text-[10px] text-muted-foreground">Browser Engine</div>
                      <div className="font-semibold text-foreground">Chrome 122.0.0</div>
                    </div>
                    <div className="p-2 rounded bg-muted/60 border border-border/80">
                      <div className="text-[10px] text-muted-foreground">Operating System</div>
                      <div className="font-semibold text-foreground">macOS Sonoma (Darwin)</div>
                    </div>
                    <div className="p-2 rounded bg-muted/60 border border-border/80">
                      <div className="text-[10px] text-muted-foreground">Device Pixel Ratio</div>
                      <div className="font-semibold text-foreground">2.0 (Retina)</div>
                    </div>
                    <div className="p-2 rounded bg-muted/60 border border-border/80">
                      <div className="text-[10px] text-muted-foreground">Snapshot Latency</div>
                      <div className="font-semibold text-foreground">&lt; 380ms (Canvas)</div>
                    </div>
                    <div className="p-2 rounded bg-muted/60 border border-border/80">
                      <div className="text-[10px] text-muted-foreground">Color Scheme</div>
                      <div className="font-semibold text-foreground">Light (Parchment)</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground flex items-center gap-2">
                  <Camera className="size-4 text-foreground shrink-0" />
                  <span>
                    A lossless visual snapshot is rendered client-side at the exact millisecond of the click.
                  </span>
                </div>
              </div>
            )}

            {/* Chapter 2 Visual: Resolution & Progress */}
            {activeChapter === 2 && (
              <div className="py-6 space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl border border-border bg-background space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20">
                        ✓
                      </div>
                      <span className="font-semibold text-sm text-foreground">
                        Heading Contrast Fixed
                      </span>
                    </div>
                    <Badge variant="pill" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                      Resolved in commit #9f2a
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                    &quot;Increased contrast ratio to 7.2:1 with semibold weight on display headings across mobile &amp; desktop viewports.&quot;
                  </p>
                </div>

                {/* Simulated resolution progress bar */}
                <div className="p-4 rounded-xl border border-border bg-muted/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Sprint 1 Review Progress</span>
                    <span className="font-mono text-muted-foreground font-semibold">12 / 12 (100% Resolved)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-full transition-all duration-500" />
                  </div>
                  <div className="text-[11px] text-muted-foreground pt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>All client feedback resolved. Ready for production deployment sign-off.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Footer Progress Controls */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-1.5">
                {chapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveChapter(i)}
                    aria-label={`Go to chapter ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      activeChapter === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveChapter((prev) => (prev + 1) % chapters.length)}
                className="text-xs text-foreground"
              >
                Next Step <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
