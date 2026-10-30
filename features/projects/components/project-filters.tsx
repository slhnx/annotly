"use client"

import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  PROJECT_SORT_ITEMS,
  PROJECT_STATUS_FILTER_ITEMS,
  type ProjectSortBy,
  type ProjectViewMode,
} from "../constants"
import { ProjectFilterSelect } from "./project-filter-select"
import { ProjectViewToggle } from "./project-view-toggle"
import type { ProjectStatus } from "../types"

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: ProjectStatus | "all"
  onStatusChange: (status: ProjectStatus | "all") => void
  sortBy: ProjectSortBy
  onSortByChange: (sort: ProjectSortBy) => void
  viewMode: ProjectViewMode
  onViewModeChange: (mode: ProjectViewMode) => void
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
}: ProjectFiltersProps) {
  return (
    <Card
      size="sm"
      className="flex-col items-stretch justify-between sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          aria-label="Search projects"
          placeholder="Search by project name or website URL..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-3 pl-9 text-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        <ProjectFilterSelect
          ariaLabel="Filter by status"
          value={statusFilter}
          items={PROJECT_STATUS_FILTER_ITEMS}
          onValueChange={onStatusChange}
        />
        <ProjectFilterSelect
          ariaLabel="Sort projects"
          value={sortBy}
          items={PROJECT_SORT_ITEMS}
          onValueChange={onSortByChange}
        />
        <ProjectViewToggle value={viewMode} onValueChange={onViewModeChange} />
      </div>
    </Card>
  )
}
