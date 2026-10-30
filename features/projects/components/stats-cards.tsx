"use client"

import { FolderKanban, MessageSquare, CheckCircle2, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { DashboardMetrics } from "../types"

interface StatsCardsProps {
  metrics: DashboardMetrics
}

const ICON_TONES = {
  info: "border-info/20 bg-info/10 text-info",
  neutral: "border-border bg-muted text-foreground",
  warning: "border-warning/20 bg-warning/10 text-warning",
  success: "border-success/20 bg-success/10 text-success",
} as const

export function StatsCards({ metrics }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Projects",
      value: metrics.totalProjects,
      description: "Active workspace websites",
      icon: FolderKanban,
      tone: ICON_TONES.info,
    },
    {
      title: "Active Reviews",
      value: metrics.activeReviews,
      description: "Open review canvases",
      icon: Eye,
      tone: ICON_TONES.neutral,
    },
    {
      title: "Open Comments",
      value: metrics.openComments,
      description: "Feedback awaiting resolution",
      icon: MessageSquare,
      tone: ICON_TONES.warning,
    },
    {
      title: "Resolution Rate",
      value: `${metrics.resolutionRate}%`,
      description: `${metrics.resolvedComments} comments resolved`,
      icon: CheckCircle2,
      tone: ICON_TONES.success,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, value, description, icon: Icon, tone }) => (
        <Card key={title} className="justify-between gap-0 p-5 hover:border-border-interactive">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{title}</span>
            <div className={`flex size-8 items-center justify-center rounded-lg border ${tone}`}>
              <Icon className="size-4" />
            </div>
          </div>

          <div className="mt-4">
            <span className="font-sans text-2xl font-bold tracking-tight text-foreground">
              {value}
            </span>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
