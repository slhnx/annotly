import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectFilterOptions,
  DashboardMetrics,
} from "../types"

// Global in-memory storage keyed by project ID to persist across dev requests
// This can be seamlessly backed by Prisma ORM / PostgreSQL in future phases
const projectsStore = new Map<string, Project>()

function generateId(prefix: string = "prj"): string {
  const randomStr = Math.random().toString(36).substring(2, 10)
  const timestamp = Date.now().toString(36)
  return `${prefix}_${timestamp}${randomStr}`
}

export class ProjectService {
  /**
   * Retrieve all projects owned by a specific user with optional search and filters.
   */
  static async getUserProjects(
    userId: string,
    filters?: ProjectFilterOptions
  ): Promise<Project[]> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    let userProjects = Array.from(projectsStore.values()).filter(
      (p) => p.userId === userId
    )

    if (filters?.query) {
      const q = filters.query.toLowerCase().trim()
      userProjects = userProjects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.websiteUrl.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }

    if (filters?.status && filters.status !== "all") {
      userProjects = userProjects.filter((p) => p.status === filters.status)
    }

    const sortBy = filters?.sortBy || "lastActivity"
    const sortOrder = filters?.sortOrder || "desc"

    userProjects.sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else {
        comparison =
          new Date(a.summary.lastActivityAt).getTime() -
          new Date(b.summary.lastActivityAt).getTime()
      }
      return sortOrder === "desc" ? -comparison : comparison
    })

    return userProjects
  }

  /**
   * Retrieve a single project by ID, verifying that it belongs to the requesting user.
   */
  static async getProjectById(
    userId: string,
    projectId: string
  ): Promise<Project | null> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const project = projectsStore.get(projectId)
    if (!project) {
      return null
    }

    if (project.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to access this project."
      )
    }

    return project
  }

  /**
   * Create a new project for the authenticated user.
   */
  static async createProject(
    userId: string,
    input: CreateProjectInput
  ): Promise<Project> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const now = new Date().toISOString()
    const projectId = generateId("prj")
    const canvasId = generateId("cnv")

    const newProject: Project = {
      id: projectId,
      userId,
      name: input.name,
      websiteUrl: input.websiteUrl,
      description: input.description || null,
      status: "active",
      reviewCanvasId: canvasId,
      reviewUrl: `/review/${canvasId}`,
      summary: {
        activeReviews: 1,
        totalComments: 0,
        openComments: 0,
        resolvedComments: 0,
        lastActivityAt: now,
      },
      createdAt: now,
      updatedAt: now,
    }

    projectsStore.set(projectId, newProject)
    return newProject
  }

  /**
   * Update an existing project, strictly verifying ownership.
   */
  static async updateProject(
    userId: string,
    projectId: string,
    input: UpdateProjectInput
  ): Promise<Project> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const existing = projectsStore.get(projectId)
    if (!existing) {
      throw new Error("Project not found.")
    }

    if (existing.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to update this project."
      )
    }

    const now = new Date().toISOString()
    const updated: Project = {
      ...existing,
      name: input.name ?? existing.name,
      websiteUrl: input.websiteUrl ?? existing.websiteUrl,
      description: input.description !== undefined ? input.description : existing.description,
      status: input.status ?? existing.status,
      updatedAt: now,
    }

    projectsStore.set(projectId, updated)
    return updated
  }

  /**
   * Delete a project by ID, strictly enforcing ownership.
   */
  static async deleteProject(userId: string, projectId: string): Promise<boolean> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const existing = projectsStore.get(projectId)
    if (!existing) {
      return false
    }

    if (existing.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to delete this project."
      )
    }

    return projectsStore.delete(projectId)
  }

  /**
   * Calculate aggregated metrics for the user's dashboard.
   */
  static async getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
    const projects = await this.getUserProjects(userId)

    const totalProjects = projects.length
    const activeReviews = projects.reduce(
      (sum, p) => sum + (p.status === "active" || p.status === "in_review" ? 1 : 0),
      0
    )
    const openComments = projects.reduce(
      (sum, p) => sum + (p.summary.openComments || 0),
      0
    )
    const resolvedComments = projects.reduce(
      (sum, p) => sum + (p.summary.resolvedComments || 0),
      0
    )

    const totalFeedback = openComments + resolvedComments
    const resolutionRate =
      totalFeedback > 0 ? Math.round((resolvedComments / totalFeedback) * 100) : 100

    return {
      totalProjects,
      activeReviews,
      openComments,
      resolvedComments,
      resolutionRate,
    }
  }

  /**
   * Seeds demo/sample projects for a user's initial onboarding experience.
   */
  static async seedSampleProjects(userId: string): Promise<Project[]> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const sample1 = await this.createProject(userId, {
      name: "Acme SaaS Marketing Landing",
      websiteUrl: "https://acme-saas.example.com",
      description: "Q4 marketing redesign review canvas for client feedback.",
    })

    // Add realistic feedback metrics to sample
    sample1.summary = {
      activeReviews: 3,
      totalComments: 12,
      openComments: 4,
      resolvedComments: 8,
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    }
    projectsStore.set(sample1.id, sample1)

    const sample2 = await this.createProject(userId, {
      name: "Stripe Checkout & Billing Flow",
      websiteUrl: "https://billing.example.com",
      description: "UX review for checkout layout and mobile responsiveness.",
    })
    sample2.summary = {
      activeReviews: 1,
      totalComments: 6,
      openComments: 1,
      resolvedComments: 5,
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    }
    projectsStore.set(sample2.id, sample2)

    return [sample1, sample2]
  }

  /**
   * Helper method for testing: clear the store.
   */
  static _clearStore(): void {
    projectsStore.clear()
  }
}
