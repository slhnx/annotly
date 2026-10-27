"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, MousePointerClick, Share2, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingCardProps {
  onSeedSample?: () => void
  isSeeding?: boolean
}

export function OnboardingCard({ onSeedSample, isSeeding }: OnboardingCardProps) {
  const steps = [
    {
      icon: MousePointerClick,
      title: "1. Input Website URL",
      description: "Generate a live interactive review canvas for any web app or staging page.",
    },
    {
      icon: Sparkles,
      title: "2. Point & Click Annotate",
      description: "Drop element-anchored pins with feedback that stays aligned across viewports.",
    },
    {
      icon: Share2,
      title: "3. Share Review Link",
      description: "Clients and stakeholders review instantly without browser extensions or accounts.",
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#eceae4] bg-gradient-to-br from-[#fcfbf8] to-[#f7f4ed] p-6 shadow-[0px_2px_8px_rgba(28,28,28,0.03)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eceae4] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
            <Sparkles className="h-3 w-3" />
            <span>Zero-Install Visual Feedback</span>
          </div>
          <h2 className="mt-2 font-heading text-lg font-bold tracking-tight text-[#1c1c1c]">
            Welcome to Annotly! Here&apos;s how review loops work
          </h2>
          <p className="mt-0.5 text-xs text-[#5f5f5d]">
            Complete your first review loop in under 60 seconds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onSeedSample && (
            <Button
              size="sm"
              variant="outline"
              onClick={onSeedSample}
              disabled={isSeeding}
              className="h-8 rounded-lg border-[#eceae4] bg-white text-xs font-semibold text-[#1c1c1c] hover:bg-[#f2ede4] cursor-pointer"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
              <span>{isSeeding ? "Generating..." : "Load Sample Projects"}</span>
            </Button>
          )}

          <Link href="/dashboard/projects?action=new">
            <Button
              size="sm"
              className="h-8 gap-1.5 rounded-lg bg-[#1c1c1c] px-3.5 text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
            >
              <span>Create First Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className="rounded-lg border border-[#eceae4]/80 bg-white/70 p-4 transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1c1c] text-[#f7f4ed] shadow-xs">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 font-heading text-xs font-semibold text-[#1c1c1c]">
                {step.title}
              </h3>
              <p className="mt-1 text-[11px] text-[#5f5f5d] leading-relaxed">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
