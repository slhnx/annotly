import React from "react"
import { Globe, MousePointerClick, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function GettingStarted() {
  const steps = [
    {
      num: "01",
      icon: Globe,
      title: "Paste your website URL",
      description:
        "Input any staging preview, Vercel deployment, Webflow site, Shopify store, or production URL. Annotly creates a secure, interactive review canvas in seconds.",
    },
    {
      num: "02",
      icon: Share2,
      title: "Share with your client or team",
      description:
        "Send the private review link. Reviewers open the link on any modern browser and can comment immediately — zero Chrome extensions, zero passwords required.",
    },
    {
      num: "03",
      icon: MousePointerClick,
      title: "Point, click, and resolve",
      description:
        "Click any element to drop anchored feedback. Reviewers and developers discuss fixes in threaded conversations and mark items resolved as code is shipped.",
    },
  ]

  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <span>Frictionless Setup</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Start reviewing in three simple steps.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          No complex software to configure. No client training manuals. Up and running in under a minute.
        </p>
      </div>

      {/* 3 Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((st) => {
          const Icon = st.icon
          return (
            <Card
              key={st.num}
              className="border-border bg-card/60 hover:bg-card transition-all hover:shadow-[rgba(0,0,0,0.03)_0px_8px_24px_0px] relative overflow-hidden"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold tracking-tight text-foreground/40">
                      {st.num}
                    </span>
                    <div className="size-9 rounded-[6px] bg-muted border border-border flex items-center justify-center">
                      <Icon className="size-4 text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
