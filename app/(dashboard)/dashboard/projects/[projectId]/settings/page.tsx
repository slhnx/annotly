import Link from "next/link"
import { notFound } from "next/navigation"
import { LayoutDashboard, Settings } from "lucide-react"
import { requireUser } from "@/lib/auth/server"
import { getProjectByIdAction } from "@/features/projects/actions"
import { ProjectDetailHeader } from "@/features/projects/components/project-detail/project-detail-header"
import { ProjectGeneralSettingsCard } from "@/features/projects/components/project-settings/project-general-settings-card"
import { ProjectReviewAccessCard } from "@/features/projects/components/project-settings/project-review-access-card"
import { ProjectDangerZoneCard } from "@/features/projects/components/project-settings/project-danger-zone-card"

interface ProjectSettingsPageProps {
  params: Promise<{
    projectId: string
  }>
}

export async function generateMetadata({ params }: ProjectSettingsPageProps) {
  const { projectId } = await params
  const res = await getProjectByIdAction(projectId)
  if (!res.success || !res.data) {
    return { title: "Project Not Found | Annotly" }
  }
  return {
    title: `Settings - ${res.data.name} | Annotly`,
    description: `Configure review settings, access controls, and preferences for ${res.data.name}`,
  }
}

export default async function ProjectSettingsPage({ params }: ProjectSettingsPageProps) {
  await requireUser()
  const { projectId } = await params
  const res = await getProjectByIdAction(projectId)

  if (!res.success || !res.data) {
    notFound()
  }

  const project = res.data

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ProjectDetailHeader project={project} />

      <div className="flex border-b border-border text-xs">
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="flex items-center gap-1.5 px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <LayoutDashboard className="size-3.5" />
          <span>Overview</span>
        </Link>
        <Link
          href={`/dashboard/projects/${project.id}/settings`}
          className="flex items-center gap-1.5 border-b-2 border-primary px-3 py-2 font-semibold text-foreground"
        >
          <Settings className="size-3.5" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="space-y-6">
        <ProjectGeneralSettingsCard project={project} />
        <ProjectReviewAccessCard project={project} />
        <ProjectDangerZoneCard project={project} />
      </div>
    </div>
  )
}
