"use client"

import Link from "next/link"
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ONBOARDING_STEPS } from "./onboarding-card.data"

interface OnboardingCardProps {
  onSeedSample?: () => void
  isSeeding?: boolean
}

export function OnboardingCard({ onSeedSample, isSeeding }: OnboardingCardProps) {
  return (
    <Card className="gap-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <CardHeader className="gap-0">
          <Badge variant="warning" className="w-fit">
            <Sparkles />
            <span>Zero-Install Visual Feedback</span>
          </Badge>
          <CardTitle className="mt-2 text-lg font-bold tracking-tight">
            Welcome to Annotly! Here&apos;s how review loops work
          </CardTitle>
          <CardDescription className="mt-0.5 text-xs">
            Complete your first review loop in under 60 seconds.
          </CardDescription>
        </CardHeader>

        <div className="flex items-center gap-2">
          {onSeedSample && (
            <Button
              size="sm"
              variant="outline"
              onClick={onSeedSample}
              disabled={isSeeding}
              className="gap-1.5 font-semibold"
            >
              <CheckCircle2 className="size-3.5 text-success" />
              <span>{isSeeding ? "Generating..." : "Load Sample Projects"}</span>
            </Button>
          )}

          <Button
            size="sm"
            nativeButton={false}
            className="gap-1.5 font-semibold"
            render={<Link href="/dashboard/projects?action=new" />}
          >
            <span>Create First Project</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>

      <Separator />

      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ONBOARDING_STEPS.map(({ icon: Icon, title, description }) => (
          <Card key={title} size="sm" className="bg-background">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="size-4" />
            </div>
            <div>
              <h3 className="font-heading text-xs font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
