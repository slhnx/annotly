"use client"

import { CheckCircle2, MessageSquare, Percent, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "../../types"

interface ProjectOverviewMetricsProps {
  project: Project
}

export function ProjectOverviewMetrics({ project }: ProjectOverviewMetricsProps) {
  const { summary } = project
  const total = (summary.openComments || 0) + (summary.resolvedComments || 0)
  const resolutionRate =
    total > 0 ? Math.round(((summary.resolvedComments || 0) / total) * 100) : 100

  const metrics = [
    {
      title: "Open Comments",
      value: summary.openComments,
      description: "Awaiting triage or developer resolution",
      icon: MessageSquare,
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Resolved Comments",
      value: summary.resolvedComments,
      description: "Addressed and marked complete",
      icon: CheckCircle2,
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Active Reviews",
      value: summary.activeReviews,
      description: "Reviewers participating on canvas",
      icon: Users,
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      description: `${summary.resolvedComments} of ${total} comments addressed`,
      icon: Percent,
      iconColor: "text-primary",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="border-border bg-card">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.title}
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className={`size-3.5 ${metric.iconColor}`} />
                </span>
              </div>
              <div className="mt-2">
                <p className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
