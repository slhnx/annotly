import React from "react"
import { XCircle, CheckCircle2, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BeforeAfter() {

  return (
    <section id="before-after" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <Sparkles className="size-3.5 text-foreground" />
          <span>The Real-World Difference</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Clear visual context vs. endless guessing.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Compare the typical email-and-screenshot review nightmare with the Annotly in-context review loop.
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* The Old Way: Chaotic Screenshots & Email */}
        <Card className="border-border bg-card/40 flex flex-col justify-between overflow-hidden">
          <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20 text-xs font-medium py-1 px-3 flex items-center gap-1.5"
                >
                  <XCircle className="size-3.5" />
                  Without Annotly (The Old Way)
                </Badge>
                <span className="text-[11px] font-mono text-muted-foreground">Scattered Channels</span>
              </div>

              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Vague messages &amp; detective work
              </h3>

              {/* Simulated Old Email / Slack Thread Mockup */}
              <div className="p-4 rounded-xl border border-border bg-background space-y-3 font-mono text-xs text-foreground/80">
                <div className="p-2.5 rounded bg-muted/60 border border-border/80">
                  <div className="text-[10px] text-muted-foreground mb-1">Email from Client (Subject: Quick edits):</div>
                  <div className="italic text-foreground">
                    &quot;Can we fix the button on that one page? Also the hero font seems a bit small on my phone.&quot;
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-muted-foreground pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">✕</span> Missing page URL or section identifier
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">✕</span> No screen width or device model specified
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">✕</span> 5 clarification messages sent back and forth
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">✕</span> No resolution tracking when code is pushed
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border text-xs text-muted-foreground">
              Result: Developers waste hours trying to reproduce the bug; simple fixes turn into days of delays.
            </div>
          </CardContent>
        </Card>

        {/* The Annotly Way: In-Context Precision */}
        <Card className="border-border bg-card flex flex-col justify-between shadow-[rgba(0,0,0,0.04)_0px_8px_30px_0px] relative overflow-hidden">
          <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="pill"
                  className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium py-1 px-3 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="size-3.5" />
                  With Annotly (Visual Clarity)
                </Badge>
                <span className="text-[11px] font-mono text-muted-foreground">Live Canvas</span>
              </div>

              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Element-anchored pin with full context
              </h3>

              {/* Simulated Annotly Card Mockup */}
              <div className="p-4 rounded-xl border border-border bg-background space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Sarah Jenkins</span>
                      <span className="text-[10px] text-muted-foreground ml-1.5">• Client Reviewer</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono py-0">
                    h1.display-title
                  </Badge>
                </div>

                <p className="text-foreground leading-relaxed">
                  &quot;Could we adjust this headline font size down to 32px on mobile viewports?&quot;
                </p>

                <div className="p-2 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border flex items-center justify-between">
                  <span>iPhone 15 Pro • 393×852 • Safari 17.3</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Snapshot Saved</span>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Status: Resolved in commit #c42</span>
                  <span className="font-medium text-foreground">Reply in thread (1)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border text-xs text-foreground font-medium flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Result: Developer locates element in 5 seconds, tests at exact viewport, fixes, and marks resolved.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
