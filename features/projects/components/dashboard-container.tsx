"use client"

import * as React from "react"
import { DashboardOverview } from "./dashboard-overview"
import type { Project, DashboardMetrics } from "../types"

interface DashboardContainerProps {
  user: {
    id: string
    email?: string | null
    name?: string | null
    avatarUrl?: string | null
  }
  initialProjects: Project[]
  initialMetrics: DashboardMetrics
}

export function DashboardContainer({
  user,
  initialProjects,
  initialMetrics,
}: DashboardContainerProps) {
  const [projects] = React.useState<Project[]>(initialProjects)
  const [metrics] = React.useState<DashboardMetrics>(initialMetrics)

  return (
    <DashboardOverview
      user={user}
      projects={projects}
      metrics={metrics}
    />
  )
}
