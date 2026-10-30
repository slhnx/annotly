"use client"

import { CheckCircle2, Globe, ShieldCheck, Zap } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const REQUIREMENTS = [
  {
    icon: Globe,
    title: "Publicly Reachable URLs",
    description:
      "Target websites must be accessible over the internet via HTTP or HTTPS. Omitted protocols automatically default to https://.",
  },
  {
    icon: Zap,
    title: "Previews & Staging Supported",
    description:
      "Works seamlessly with Vercel, Netlify, Cloudflare Pages, and custom staging domains with public or password-protected ingress.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Install Architecture",
    description:
      "No JavaScript tracking snippets, browser extensions, or code modifications needed on the target website.",
  },
]

export function UrlRequirementsCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-foreground">
            Target URL Requirements
          </CardTitle>
          <Badge variant="outline" className="text-[10px] uppercase font-semibold">
            Live Canvas
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          What you need to know before initializing an interactive review canvas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3.5 pt-0">
        {REQUIREMENTS.map((req) => {
          const Icon = req.icon
          return (
            <div key={req.title} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                <Icon className="size-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">{req.title}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {req.description}
                </p>
              </div>
            </div>
          )
        })}

        <div className="rounded-lg border border-border/80 bg-muted/40 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Automatic Normalization</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Enter bare domains like <span className="font-mono text-foreground">myagency.dev/staging</span> and Annotly will normalize them to full HTTPS targets automatically.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
