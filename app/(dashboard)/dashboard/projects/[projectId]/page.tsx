import Link from "next/link"
import { notFound } from "next/navigation"
import { LayoutDashboard, Settings } from "lucide-react"
import { requireUser } from "@/lib/auth/server"
import { getProjectByIdAction } from "@/features/projects/actions"
import { ProjectDetailHeader } from "@/features/projects/components/project-detail/project-detail-header"
import { ProjectReviewLinkCard } from "@/features/projects/components/project-detail/project-review-link-card"
import { ProjectOverviewMetrics } from "@/features/projects/components/project-detail/project-overview-metrics"
import { ProjectActivityCard } from "@/features/projects/components/project-detail/project-activity-card"

interface ProjectPageProps {
  params: Promise<{
    projectId: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectId } = await params
  const res = await getProjectByIdAction(projectId)
  if (!res.success || !res.data) {
    return { title: "Project Not Found | Annotly" }
  }
  return {
    title: `${res.data.name} | Annotly Review Canvas`,
    description: `Interactive visual feedback review overview for ${res.data.websiteUrl}`,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  await requireUser()
  const { projectId } = await params
  const res = await getProjectByIdAction(projectId)

  if (!res.success || !res.data) {
    notFound()
  }

  const project = res.data

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <ProjectDetailHeader project={project} />

      <div className="flex border-b border-border text-xs">
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="flex items-center gap-1.5 border-b-2 border-primary px-3 py-2 font-semibold text-foreground"
        >
          <LayoutDashboard className="size-3.5" />
          <span>Overview</span>
        </Link>
        <Link
          href={`/dashboard/projects/${project.id}/settings`}
          className="flex items-center gap-1.5 px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Settings className="size-3.5" />
          <span>Settings</span>
        </Link>
      </div>

      <ProjectReviewLinkCard project={project} />

      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Performance & Triage Metrics
        </h2>
        <ProjectOverviewMetrics project={project} />
      </div>

      <ProjectActivityCard project={project} />
    </div>
  )
}
