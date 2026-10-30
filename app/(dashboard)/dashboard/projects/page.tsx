import type { Metadata } from "next"
import { requireUser } from "@/lib/auth/server"
import { getProjectsAction } from "@/features/projects/actions"
import { ProjectsPageContainer } from "@/features/projects/components/projects-page-container"

export const metadata: Metadata = {
  title: "Projects | Annotly Dashboard",
  description: "Browse, filter, and manage website visual review projects.",
}

interface ProjectsPageProps {
  searchParams: Promise<{
    action?: string
  }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  await requireUser()

  const { action } = await searchParams
  const defaultCreateOpen = action === "new"

  const projectsResult = await getProjectsAction()
  const initialProjects =
    projectsResult.success && projectsResult.data ? projectsResult.data : []

  return (
    <ProjectsPageContainer
      initialProjects={initialProjects}
      defaultCreateOpen={defaultCreateOpen}
    />
  )
}
