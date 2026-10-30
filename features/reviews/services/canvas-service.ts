import { prisma } from "@/lib/db"
import type { Canvas as PrismaCanvas } from "@prisma/client"
import type { CanvasDomain, PublicReviewCanvas, ReviewAccess } from "../types"

function mapPrismaCanvasToDomain(c: PrismaCanvas): CanvasDomain {
  return {
    id: c.id,
    projectId: c.projectId,
    token: c.token,
    name: c.name,
    url: c.url,
    reviewAccess: c.reviewAccess as ReviewAccess,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }
}

export class CanvasService {
  /**
   * Look up a public review canvas by its shareable token.
   * Redacts private owner metadata and returns safe public fields.
   */
  static async getCanvasByToken(token: string): Promise<PublicReviewCanvas | null> {
    if (!token?.trim()) {
      return null
    }

    const record = await prisma.canvas.findUnique({
      where: { token: token.trim() },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
            totalComments: true,
            openComments: true,
            resolvedComments: true,
          },
        },
      },
    })

    if (!record) {
      return null
    }

    return {
      id: record.id,
      token: record.token,
      name: record.name,
      url: record.url,
      reviewAccess: record.reviewAccess as ReviewAccess,
      projectId: record.project.id,
      projectName: record.project.name,
      projectStatus: record.project.status,
      totalComments: record.project.totalComments,
      openComments: record.project.openComments,
      resolvedComments: record.project.resolvedComments,
    }
  }

  /**
   * Retrieve all canvases belonging to a project, verifying owner access.
   */
  static async getProjectCanvases(
    userId: string,
    projectId: string
  ): Promise<CanvasDomain[]> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true },
    })

    if (!project) {
      throw new Error("Project not found.")
    }

    if (project.userId !== userId) {
      throw new Error("Forbidden: You do not have permission to access this project.")
    }

    const canvases = await prisma.canvas.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
    })

    return canvases.map(mapPrismaCanvasToDomain)
  }

  /**
   * Update review access mode (public vs paused) for a canvas, strictly owner authorized.
   */
  static async updateCanvasAccess(
    userId: string,
    canvasId: string,
    reviewAccess: ReviewAccess
  ): Promise<CanvasDomain> {
    if (!userId) {
      throw new Error("Unauthorized: User ID is required.")
    }

    const canvas = await prisma.canvas.findUnique({
      where: { id: canvasId },
      include: { project: { select: { userId: true, reviewCanvasId: true } } },
    })

    if (!canvas) {
      throw new Error("Canvas not found.")
    }

    if (canvas.project.userId !== userId) {
      throw new Error("Forbidden: You do not have permission to modify this canvas.")
    }

    const updated = await prisma.canvas.update({
      where: { id: canvasId },
      data: { reviewAccess },
    })

    // If this canvas is the primary reviewCanvasId, keep the project's reviewAccess in sync
    if (canvas.project.reviewCanvasId === canvas.token) {
      await prisma.project.update({
        where: { id: canvas.projectId },
        data: { reviewAccess },
      })
    }

    return mapPrismaCanvasToDomain(updated)
  }
}
