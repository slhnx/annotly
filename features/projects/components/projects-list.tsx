"use client"

import * as React from "react"
import { useProjectFilters } from "../hooks/use-project-filters"
import { ProjectFilters } from "./project-filters"
import { ProjectFormDialog } from "./project-form-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { ProjectsCollection } from "./projects-collection"
import { ProjectsEmptyState } from "./projects-empty-state"
import { ProjectsListHeader } from "./projects-list-header"
import type { Project, ProjectStatus } from "../types"

interface ProjectsListProps {
  initialProjects: Project[]
  onCreateProject: (values: {
    name: string
    websiteUrl: string
    description?: string
  }) => Promise<{
    success: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
  }>
  onUpdateProject: (
    projectId: string,
    values: {
      name?: string
      websiteUrl?: string
      description?: string
      status?: ProjectStatus
    }
  ) => Promise<{
    success: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
  }>
  onDeleteProject: (projectId: string) => Promise<{
    success: boolean
    error?: string
  }>
  defaultCreateOpen?: boolean
}

export function ProjectsList({
  initialProjects,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  defaultCreateOpen = false,
}: ProjectsListProps) {
  const projects = initialProjects
  const filters = useProjectFilters(projects)

  const [createDialogOpen, setCreateDialogOpen] = React.useState(defaultCreateOpen)
  const [editingProject, setEditingProject] = React.useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = React.useState<Project | null>(null)


  const handleUpdateSubmit = async (values: {
    name: string
    websiteUrl: string
    description?: string
    status?: ProjectStatus
  }) => {
    if (!editingProject) return { success: false, error: "No project selected." }
    const res = await onUpdateProject(editingProject.id, values)
    if (res.success) setEditingProject(null)
    return res
  }

  const handleDeleteConfirm = async (project: Project) => {
    await onDeleteProject(project.id)
    setDeletingProject(null)
  }

  return (
    <div className="space-y-6">
      <ProjectsListHeader
        projectCount={projects.length}
        onCreate={() => setCreateDialogOpen(true)}
      />

      <ProjectFilters
        searchQuery={filters.searchQuery}
        onSearchChange={filters.setSearchQuery}
        statusFilter={filters.statusFilter}
        onStatusChange={filters.setStatusFilter}
        sortBy={filters.sortBy}
        onSortByChange={filters.setSortBy}
        viewMode={filters.viewMode}
        onViewModeChange={filters.setViewMode}
      />

      {filters.filteredProjects.length === 0 ? (
        <ProjectsEmptyState
          isFiltered={filters.hasActiveFilters}
          onResetFilters={filters.resetFilters}
          onCreate={() => setCreateDialogOpen(true)}
        />
      ) : (
        <ProjectsCollection
          projects={filters.filteredProjects}
          viewMode={filters.viewMode}
          onEdit={setEditingProject}
          onDelete={setDeletingProject}
        />
      )}

      <ProjectFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={onCreateProject}
      />

      <ProjectFormDialog
        open={Boolean(editingProject)}
        onOpenChange={(open) => !open && setEditingProject(null)}
        initialData={editingProject}
        onSubmit={handleUpdateSubmit}
      />

      <DeleteProjectDialog
        project={deletingProject}
        open={Boolean(deletingProject)}
        onOpenChange={(open) => !open && setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
