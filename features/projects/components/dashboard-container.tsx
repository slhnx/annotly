"use client"

import * as React from "react"
import { DashboardOverview } from "./dashboard-overview"
import { seedSampleProjectsAction, getDashboardMetricsAction } from "../actions"
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
  const [projects, setProjects] = React.useState<Project[]>(initialProjects)
  const [metrics, setMetrics] = React.useState<DashboardMetrics>(initialMetrics)
  const [isSeeding, setIsSeeding] = React.useState(false)

  const handleSeedSample = async () => {
    setIsSeeding(true)
    try {
      const res = await seedSampleProjectsAction()
      if (res.success && res.data) {
        setProjects(res.data)
        const metricsRes = await getDashboardMetricsAction()
        if (metricsRes.success && metricsRes.data) {
          setMetrics(metricsRes.data)
        }
      }
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <DashboardOverview
      user={user}
      projects={projects}
      metrics={metrics}
      onSeedSample={handleSeedSample}
      isSeeding={isSeeding}
    />
  )
}
