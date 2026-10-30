import type { ProjectFilterOptions, ProjectStatus } from "./types"

export type ProjectSortBy = NonNullable<ProjectFilterOptions["sortBy"]>
export type ProjectViewMode = "grid" | "list"
export type ProjectBadgeVariant = "success" | "info" | "warning" | "secondary"

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "Active",
  in_review: "In Review",
  completed: "Completed",
  archived: "Archived",
}

export const PROJECT_STATUS_BADGE_VARIANTS: Record<ProjectStatus, ProjectBadgeVariant> = {
  active: "success",
  in_review: "warning",
  completed: "info",
  archived: "secondary",
}


export const PROJECT_STATUS_FILTER_ITEMS: Record<ProjectStatus | "all", string> = {
  all: "All Statuses",
  ...PROJECT_STATUS_LABELS,
}

export const PROJECT_SORT_ITEMS: Record<ProjectSortBy, string> = {
  lastActivity: "Recent Activity",
  createdAt: "Date Created",
  name: "Alphabetical",
}
