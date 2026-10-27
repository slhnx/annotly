"use client"

import * as React from "react"
import { FolderKanban, MessageSquare, CheckCircle2, Eye } from "lucide-react"
import type { DashboardMetrics } from "../types"

interface StatsCardsProps {
  metrics: DashboardMetrics
}

export function StatsCards({ metrics }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Projects",
      value: metrics.totalProjects,
      description: "Active workspace websites",
      icon: FolderKanban,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200/60",
    },
    {
      title: "Active Reviews",
      value: metrics.activeReviews,
      description: "Open review canvases",
      icon: Eye,
      iconColor: "text-purple-600 bg-purple-50 border-purple-200/60",
    },
    {
      title: "Open Comments",
      value: metrics.openComments,
      description: "Feedback awaiting resolution",
      icon: MessageSquare,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200/60",
    },
    {
      title: "Resolution Rate",
      value: `${metrics.resolutionRate}%`,
      description: `${metrics.resolvedComments} comments resolved`,
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="flex flex-col justify-between rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5 shadow-[0px_1px_3px_rgba(28,28,28,0.02)] transition-all hover:border-[#dedbd3]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#5f5f5d]">
                {card.title}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border ${card.iconColor}`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4">
              <span className="font-heading text-2xl font-bold tracking-tight text-[#1c1c1c]">
                {card.value}
              </span>
              <p className="mt-0.5 text-xs text-[#5f5f5d]">
                {card.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
