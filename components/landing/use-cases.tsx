import React from "react"
import { Building2, User, Rocket, Palette, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UseCases() {
  const cases = [
    {
      title: "Web Agencies & Studios",
      tagline: "Cut client revision rounds by half",
      icon: Building2,
      badge: "Agencies",
      description:
        "Deliver staging links that clients actually enjoy using. Give non-technical stakeholders an effortless way to leave pin-pointed feedback directly on their upcoming website, eliminating 2-page Word docs and endless Zoom walkthroughs.",
      perks: [
        "Zero-install guest commenting for all clients",
        "Multiple viewports in a single shared link",
        "Clear progress tracking toward milestone sign-off",
      ],
    },
    {
      title: "Freelance Developers & Designers",
      tagline: "Get exact, actionable change requests",
      icon: User,
      badge: "Freelancers",
      description:
        "Stop guessing what a client means by 'make that section pop'. Every pin gives you the exact DOM selector, viewport width, and a visual screenshot so you can implement visual changes in minutes instead of hours.",
      perks: [
        "Automatic browser & device detection",
        "Threaded discussion directly on each element",
        "Shareable links with no client logins needed",
      ],
    },
    {
      title: "SaaS & Product Teams",
      tagline: "Streamline PR and staging QA reviews",
      icon: Rocket,
      badge: "Product & Engineering",
      description:
        "Review Vercel preview deployments, Netlify branches, and staging builds together. Designers, PMs, and frontend engineers can annotate visual regressions before code merges to production.",
      perks: [
        "Works with preview and ephemeral deployments",
        "Threaded context preserves technical rationale",
        "One-click resolution as bugs are squashed",
      ],
    },
    {
      title: "Marketing & Brand Teams",
      tagline: "Perfect copy and imagery before publishing",
      icon: Palette,
      badge: "Marketing",
      description:
        "Collaborate on live landing pages, Webflow sites, and Shopify stores. Highlight typos, request banner swaps, and approve final layouts right where customers will see them.",
      perks: [
        "Live text & layout review in context",
        "Safe reverse proxy works with Webflow and Shopify",
        "Clutter-free resolution for team alignment",
      ],
    },
  ]

  return (
    <section id="use-cases" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <span>Tailored Workflows</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Built for every role in the website review loop.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Whether you are shipping agency client projects or reviewing product staging builds, Annotly adapts to your existing delivery cycle.
        </p>
      </div>

      {/* 2x2 Grid of Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c) => {
          const Icon = c.icon
          return (
            <Card
              key={c.title}
              className="border-border bg-card/60 hover:bg-card transition-all hover:shadow-[rgba(0,0,0,0.03)_0px_8px_24px_0px] flex flex-col justify-between"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-[6px] bg-muted border border-border flex items-center justify-center">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <Badge variant="pill" className="text-[11px] font-normal py-0">
                      {c.badge}
                    </Badge>
                  </div>

                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground mb-1">
                    {c.title}
                  </h3>
                  <div className="text-xs font-medium text-muted-foreground mb-4">
                    {c.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {c.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-border/80">
                    {c.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-foreground/90">
                        <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
