"use client"

import * as React from "react"
import type { ProjectSortBy, ProjectViewMode } from "../constants"
import type { Project, ProjectStatus } from "../types"

function matchesQuery(project: Project, query: string): boolean {
  return (
    project.name.toLowerCase().includes(query) ||
    project.websiteUrl.toLowerCase().includes(query) ||
    Boolean(project.description?.toLowerCase().includes(query))
  )
}

function compareProjects(sortBy: ProjectSortBy) {
  return (a: Project, b: Project): number => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return (
      new Date(b.summary.lastActivityAt).getTime() -
      new Date(a.summary.lastActivityAt).getTime()
    )
  }
}

export function useProjectFilters(projects: Project[]) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus | "all">("all")
  const [sortBy, setSortBy] = React.useState<ProjectSortBy>("lastActivity")
  const [viewMode, setViewMode] = React.useState<ProjectViewMode>("grid")

  const filteredProjects = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    return projects
      .filter((p) => !query || matchesQuery(p, query))
      .filter((p) => statusFilter === "all" || p.status === statusFilter)
      .sort(compareProjects(sortBy))
  }, [projects, searchQuery, statusFilter, sortBy])

  const hasActiveFilters = Boolean(searchQuery) || statusFilter !== "all"

  const resetFilters = React.useCallback(() => {
    setSearchQuery("")
    setStatusFilter("all")
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredProjects,
    hasActiveFilters,
    resetFilters,
  }
}
