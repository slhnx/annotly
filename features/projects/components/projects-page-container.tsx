"use client"

import * as React from "react"
import { ProjectsList } from "./projects-list"
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "../actions"
import type { Project, ProjectStatus } from "../types"

interface ProjectsPageContainerProps {
  initialProjects: Project[]
  defaultCreateOpen?: boolean
}

export function ProjectsPageContainer({
  initialProjects,
  defaultCreateOpen = false,
}: ProjectsPageContainerProps) {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects)

  const handleCreate = async (values: {
    name: string
    websiteUrl: string
    description?: string
  }) => {
    const res = await createProjectAction(values)
    if (res.success && res.data) {
      setProjects((prev) => [res.data!, ...prev])
      return { success: true }
    }
    return {
      success: false,
      error: res.error,
      fieldErrors: res.fieldErrors,
    }
  }

  const handleUpdate = async (
    projectId: string,
    values: {
      name?: string
      websiteUrl?: string
      description?: string
      status?: ProjectStatus
    }
  ) => {
    const res = await updateProjectAction(projectId, values)
    if (res.success && res.data) {
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? res.data! : p))
      )
      return { success: true }
    }
    return {
      success: false,
      error: res.error,
      fieldErrors: res.fieldErrors,
    }
  }

  const handleDelete = async (projectId: string) => {
    const res = await deleteProjectAction(projectId)
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId))
      return { success: true }
    }
    return { success: false, error: res.error }
  }

  return (
    <ProjectsList
      initialProjects={projects}
      onCreateProject={handleCreate}
      onUpdateProject={handleUpdate}
      onDeleteProject={handleDelete}
      defaultCreateOpen={defaultCreateOpen}
    />
  )
}
