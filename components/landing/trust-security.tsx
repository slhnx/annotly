import React from "react"
import { ShieldCheck, Lock, Globe2, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TrustSecurity() {
  const assurances = [
    {
      icon: ShieldCheck,
      title: "SSRF-Protected Reverse Proxy",
      badge: "Network Hardening",
      description:
        "When Annotly frames upstream websites, all requests pass through a dedicated Next.js proxy route handler with strict SSRF defense. DNS resolutions are validated against loopback addresses (127.0.0.1), RFC1918 private subnets, and cloud metadata IPs (169.254.169.254) to prevent internal network scanning.",
    },
    {
      icon: Lock,
      title: "Safe Framing & CSP Sanitization",
      badge: "Zero Clickjacking",
      description:
        "Modern websites enforce strict 'X-Frame-Options: DENY' and CSP 'frame-ancestors' headers. Annotly safely sanitizes framing headers within an isolated sandboxed origin while keeping native target site CSS, JavaScript, and asset security intact.",
    },
    {
      icon: Globe2,
      title: "Universal Platform Compatibility",
      badge: "Any Web Stack",
      description:
        "Annotly works out of the box with Next.js, Vercel preview URLs, Netlify branch deploys, Webflow sites, Shopify stores, WordPress, Astro, Vite, or static HTML. If it runs in a browser and has a reachable URL, your team can review it.",
    },
  ]

  return (
    <section className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <Sparkles className="size-3.5 text-foreground" />
          <span>Security &amp; Architecture</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Engineered securely from the ground up.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Transparent, secure infrastructure designed to handle complex staging environments without compromising network security.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assurances.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.title}
              className="border-border bg-card/60 hover:bg-card transition-all flex flex-col justify-between"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-[6px] bg-muted border border-border flex items-center justify-center">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <Badge variant="pill" className="text-[11px] font-normal py-0">
                      {item.badge}
                    </Badge>
                  </div>

                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
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
