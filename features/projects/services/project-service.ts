import { prisma } from "@/lib/db"
import type { Prisma, Project as PrismaProject } from "@prisma/client"
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectFilterOptions,
  DashboardMetrics,
  ProjectStatus,
  ReviewAccess,
} from "../types"
import { sanitizeUrl } from "../schemas/project.schema"

function generateId(prefix: string = "prj"): string {
  const randomStr = Math.random().toString(36).substring(2, 10)
  const timestamp = Date.now().toString(36)
  return `${prefix}_${timestamp}${randomStr}`
}

function mapPrismaProjectToDomain(p: PrismaProject): Project {
  return {
    id: p.id,
    userId: p.userId,
    name: p.name,
    websiteUrl: p.websiteUrl,
    description: p.description,
    status: p.status as ProjectStatus,
    reviewAccess: p.reviewAccess as ReviewAccess,
    reviewCanvasId: p.reviewCanvasId,
    reviewUrl: `/review/${p.reviewCanvasId}`,
    summary: {
      activeReviews: p.activeReviews,
      totalComments: p.totalComments,
      openComments: p.openComments,
      resolvedComments: p.resolvedComments,
      lastActivityAt: p.lastActivityAt.toISOString(),
    },
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }
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

    const where: Prisma.ProjectWhereInput = {
      userId,
    }

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status
    }

    if (filters?.query) {
      const q = filters.query.trim()
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { websiteUrl: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ]
    }

    let orderBy: Prisma.ProjectOrderByWithRelationInput
    const sortBy = filters?.sortBy || "lastActivity"
    const sortOrder = filters?.sortOrder || "desc"

    if (sortBy === "name") {
      orderBy = { name: sortOrder }
    } else if (sortBy === "createdAt") {
      orderBy = { createdAt: sortOrder }
    } else {
      orderBy = { lastActivityAt: sortOrder }
    }

    const records = await prisma.project.findMany({
      where,
      orderBy,
    })

    return records.map(mapPrismaProjectToDomain)
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

    const record = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!record) {
      return null
    }

    if (record.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to access this project."
      )
    }

    return mapPrismaProjectToDomain(record)
  }

  /**
   * Create a new project for the authenticated user with duplicate detection.
   */
  static async createProject(
    userId: string,
    input: CreateProjectInput
  ): Promise<Project> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const trimmedName = input.name.trim()
    const duplicate = await prisma.project.findFirst({
      where: {
        userId,
        name: { equals: trimmedName, mode: "insensitive" },
      },
    })

    if (duplicate) {
      throw new Error("A project with this name already exists in your workspace.")
    }

    const projectId = generateId("prj")
    const canvasId = generateId("cnv")

    const record = await prisma.project.create({
      data: {
        id: projectId,
        userId,
        name: trimmedName,
        websiteUrl: sanitizeUrl(input.websiteUrl),
        description: input.description?.trim() || null,
        status: "active",
        reviewAccess: input.reviewAccess || "public",
        reviewCanvasId: canvasId,
        activeReviews: 1,
        totalComments: 0,
        openComments: 0,
        resolvedComments: 0,
        lastActivityAt: new Date(),
      },
    })

    return mapPrismaProjectToDomain(record)
  }

  /**
   * Update an existing project, strictly verifying ownership and duplicate names.
   */
  static async updateProject(
    userId: string,
    projectId: string,
    input: UpdateProjectInput
  ): Promise<Project> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!existing) {
      throw new Error("Project not found.")
    }

    if (existing.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to update this project."
      )
    }

    if (input.name) {
      const trimmedName = input.name.trim()
      const duplicate = await prisma.project.findFirst({
        where: {
          id: { not: projectId },
          userId,
          name: { equals: trimmedName, mode: "insensitive" },
        },
      })

      if (duplicate) {
        throw new Error("A project with this name already exists in your workspace.")
      }
    }

    const data: Prisma.ProjectUpdateInput = {}
    if (input.name !== undefined) data.name = input.name.trim()
    if (input.websiteUrl !== undefined) data.websiteUrl = sanitizeUrl(input.websiteUrl)
    if (input.description !== undefined) {
      data.description = input.description?.trim() || null
    }
    if (input.status !== undefined) data.status = input.status
    if (input.reviewAccess !== undefined) data.reviewAccess = input.reviewAccess
    if (input.summary) {
      if (input.summary.activeReviews !== undefined) data.activeReviews = input.summary.activeReviews
      if (input.summary.totalComments !== undefined) data.totalComments = input.summary.totalComments
      if (input.summary.openComments !== undefined) data.openComments = input.summary.openComments
      if (input.summary.resolvedComments !== undefined) data.resolvedComments = input.summary.resolvedComments
      if (input.summary.lastActivityAt !== undefined) {
        data.lastActivityAt = new Date(input.summary.lastActivityAt)
      }
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data,
    })

    return mapPrismaProjectToDomain(updated)
  }

  /**
   * Helper to update project summary counts in the database.
   */
  static async updateProjectSummary(
    userId: string,
    projectId: string,
    summary: Partial<import("../types").ProjectReviewSummary>
  ): Promise<Project> {
    return this.updateProject(userId, projectId, { summary })
  }

  /**
   * Regenerate review canvas link token for a project.
   */
  static async regenerateReviewLink(
    userId: string,
    projectId: string
  ): Promise<Project> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!existing) {
      throw new Error("Project not found.")
    }

    if (existing.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to update this project."
      )
    }

    const canvasId = generateId("cnv")
    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        reviewCanvasId: canvasId,
      },
    })

    return mapPrismaProjectToDomain(updated)
  }

  /**
   * Delete a project by ID, strictly enforcing ownership.
   */
  static async deleteProject(userId: string, projectId: string): Promise<boolean> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!existing) {
      return false
    }

    if (existing.userId !== userId) {
      throw new Error(
        "Forbidden: You do not have permission to delete this project."
      )
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    return true
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

    await prisma.project.update({
      where: { id: sample1.id },
      data: {
        activeReviews: 3,
        totalComments: 12,
        openComments: 4,
        resolvedComments: 8,
        lastActivityAt: new Date(Date.now() - 1000 * 60 * 45),
      },
    })

    const sample2 = await this.createProject(userId, {
      name: "Stripe Checkout & Billing Flow",
      websiteUrl: "https://billing.example.com",
      description: "UX review for checkout layout and mobile responsiveness.",
    })

    await prisma.project.update({
      where: { id: sample2.id },
      data: {
        activeReviews: 1,
        totalComments: 6,
        openComments: 1,
        resolvedComments: 5,
        lastActivityAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
    })

    return this.getUserProjects(userId)
  }

  /**
   * Helper method for testing: clear the store in database.
   */
  static async _clearStore(): Promise<void> {
    await prisma.project.deleteMany({})
  }
}
