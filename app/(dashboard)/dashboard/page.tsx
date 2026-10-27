import type { Metadata } from "next"
import { requireUser, formatUserProfile } from "@/lib/auth/server"
import { getProjectsAction, getDashboardMetricsAction } from "@/features/projects/actions"
import { DashboardContainer } from "@/features/projects/components/dashboard-container"

export const metadata: Metadata = {
  title: "Overview | Annotly Dashboard",
  description: "Monitor website reviews, element-anchored pins, and client feedback.",
}

export default async function DashboardPage() {
  const user = await requireUser()
  const userProfile = formatUserProfile(user)

  const [projectsResult, metricsResult] = await Promise.all([
    getProjectsAction(),
    getDashboardMetricsAction(),
  ])

  const initialProjects = projectsResult.success && projectsResult.data ? projectsResult.data : []
  const initialMetrics = metricsResult.success && metricsResult.data ? metricsResult.data : {
    totalProjects: 0,
    activeReviews: 0,
    openComments: 0,
    resolvedComments: 0,
    resolutionRate: 100,
  }

  return (
    <DashboardContainer
      user={userProfile}
      initialProjects={initialProjects}
      initialMetrics={initialMetrics}
    />
  )
}
