"use client"

import * as React from "react"
import { Plus, FolderKanban, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectFilters } from "./project-filters"
import { ProjectCard } from "./project-card"
import { ProjectRow } from "./project-row"
import { ProjectFormDialog } from "./project-form-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
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
  const [projects, setProjects] = React.useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus | "all">("all")
  const [sortBy, setSortBy] = React.useState<"lastActivity" | "createdAt" | "name">("lastActivity")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  // Modals state
  const [createDialogOpen, setCreateDialogOpen] = React.useState(defaultCreateOpen)
  const [editingProject, setEditingProject] = React.useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = React.useState<Project | null>(null)

  React.useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  // Filter and sort computation
  const filteredProjects = React.useMemo(() => {
    let result = [...projects]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.websiteUrl.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter)
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return (
        new Date(b.summary.lastActivityAt).getTime() -
        new Date(a.summary.lastActivityAt).getTime()
      )
    })

    return result
  }, [projects, searchQuery, statusFilter, sortBy])

  const handleCreateSubmit = async (values: {
    name: string
    websiteUrl: string
    description?: string
  }) => {
    const res = await onCreateProject(values)
    return res
  }

  const handleUpdateSubmit = async (values: {
    name: string
    websiteUrl: string
    description?: string
    status?: ProjectStatus
  }) => {
    if (!editingProject) return { success: false, error: "No project selected." }
    const res = await onUpdateProject(editingProject.id, values)
    if (res.success) {
      setEditingProject(null)
    }
    return res
  }

  const handleDeleteConfirm = async (project: Project) => {
    await onDeleteProject(project.id)
    setDeletingProject(null)
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1c1c1c]">
              Review Projects
            </h1>
            <span className="rounded-full bg-[#f2ede4] px-2.5 py-0.5 text-xs font-semibold text-[#5f5f5d]">
              {projects.length}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#5f5f5d]">
            Manage websites, review canvas links, and active feedback discussions.
          </p>
        </div>

        <div>
          <Button
            size="sm"
            onClick={() => setCreateDialogOpen(true)}
            className="h-9 gap-1.5 rounded-lg bg-[#1c1c1c] px-4 text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* Filter and View Controls */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-12 text-center shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2ede4] text-[#1c1c1c] mb-3">
            <FolderKanban className="h-6 w-6 text-[#5f5f5d]" />
          </div>
          <h3 className="font-heading text-base font-bold text-[#1c1c1c]">
            {searchQuery || statusFilter !== "all"
              ? "No matching projects found"
              : "No projects in workspace"}
          </h3>
          <p className="mt-1 text-xs text-[#5f5f5d] max-w-sm mx-auto">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search keywords or clearing your status filters."
              : "Get started by generating your first live website review canvas."}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            {searchQuery || statusFilter !== "all" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                }}
                className="h-8 gap-1.5 border-[#eceae4] text-xs font-semibold text-[#1c1c1c] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setCreateDialogOpen(true)}
                className="h-8 gap-1.5 bg-[#1c1c1c] px-3.5 text-xs font-semibold text-[#f7f4ed] shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create First Project</span>
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={setEditingProject}
              onDelete={setDeletingProject}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] overflow-hidden shadow-xs">
          {filteredProjects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onEdit={setEditingProject}
              onDelete={setDeletingProject}
            />
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <ProjectFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateSubmit}
      />

      {/* Edit Dialog */}
      <ProjectFormDialog
        open={Boolean(editingProject)}
        onOpenChange={(open) => !open && setEditingProject(null)}
        initialData={editingProject}
        onSubmit={handleUpdateSubmit}
      />

      {/* Delete Dialog */}
      <DeleteProjectDialog
        project={deletingProject}
        open={Boolean(deletingProject)}
        onOpenChange={(open) => !open && setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
