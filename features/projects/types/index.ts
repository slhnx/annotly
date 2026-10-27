export type ProjectStatus = "active" | "in_review" | "completed" | "archived"

export interface ProjectReviewSummary {
  activeReviews: number
  totalComments: number
  openComments: number
  resolvedComments: number
  lastActivityAt: string
}

export interface Project {
  id: string
  userId: string
  name: string
  websiteUrl: string
  description?: string | null
  status: ProjectStatus
  reviewCanvasId: string
  reviewUrl: string
  summary: ProjectReviewSummary
  createdAt: string
  updatedAt: string
}

export interface CreateProjectInput {
  name: string
  websiteUrl: string
  description?: string | null
}

export interface UpdateProjectInput {
  name?: string
  websiteUrl?: string
  description?: string | null
  status?: ProjectStatus
}

export interface ProjectFilterOptions {
  query?: string
  status?: ProjectStatus | "all"
  sortBy?: "lastActivity" | "createdAt" | "name"
  sortOrder?: "asc" | "desc"
}

export interface DashboardMetrics {
  totalProjects: number
  activeReviews: number
  openComments: number
  resolvedComments: number
  resolutionRate: number
}

export interface ActionResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
  fieldErrors?: Record<string, string[]>
}
