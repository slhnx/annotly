"use client"

import { Card } from "@/components/ui/card"
import type { ProjectViewMode } from "../constants"
import { ProjectCard } from "./project-card"
import { ProjectRow } from "./project-row"
import type { Project } from "../types"

interface ProjectsCollectionProps {
  projects: Project[]
  viewMode: ProjectViewMode
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectsCollection({
  projects,
  viewMode,
  onEdit,
  onDelete,
}: ProjectsCollectionProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    )
  }

  return (
    <Card className="gap-0 p-0">
      {projects.map((project) => (
        <ProjectRow key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Card>
  )
}
