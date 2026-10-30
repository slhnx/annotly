import { prisma } from "@/lib/db"
import type { Annotation as PrismaAnnotation, AnnotationReply as PrismaReply } from "@prisma/client"
import type {
  AnnotationDomain,
  AnnotationReplyDomain,
  AnnotationStatus,
  CreateAnnotationInput,
  CreateReplyInput,
  ActorContext,
} from "../types"
import { createAnnotationSchema, createReplySchema, updateAnnotationStatusSchema } from "../schemas/annotation.schema"

function mapReplyToDomain(r: PrismaReply): AnnotationReplyDomain {
  return {
    id: r.id,
    annotationId: r.annotationId,
    userId: r.userId,
    authorName: r.authorName,
    authorEmail: r.authorEmail,
    content: r.content,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }
}

function mapAnnotationToDomain(
  a: PrismaAnnotation & { replies?: PrismaReply[] }
): AnnotationDomain {
  return {
    id: a.id,
    canvasId: a.canvasId,
    projectId: a.projectId,
    userId: a.userId,
    authorName: a.authorName,
    authorEmail: a.authorEmail,
    elementSelector: a.elementSelector,
    elementXPath: a.elementXPath,
    elementTag: a.elementTag,
    elementTextSnippet: a.elementTextSnippet,
    offsetX: a.offsetX,
    offsetY: a.offsetY,
    viewportWidth: a.viewportWidth,
    viewportHeight: a.viewportHeight,
    devicePixelRatio: a.devicePixelRatio,
    browser: a.browser,
    os: a.os,
    content: a.content,
    status: a.status as AnnotationStatus,
    screenshotUrl: a.screenshotUrl,
    resolvedAt: a.resolvedAt ? a.resolvedAt.toISOString() : null,
    resolvedBy: a.resolvedBy,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    replies: a.replies ? a.replies.map(mapReplyToDomain) : undefined,
  }
}

export class AnnotationService {
  /**
   * Create a visual pin annotation on a canvas, atomically updating project comment metrics.
   */
  static async createAnnotation(input: CreateAnnotationInput): Promise<AnnotationDomain> {
    const validated = createAnnotationSchema.parse(input)

    const canvas = await prisma.canvas.findUnique({
      where: { token: validated.canvasToken },
      include: { project: { select: { id: true, reviewAccess: true } } },
    })

    if (!canvas) {
      throw new Error("Review canvas not found.")
    }

    if (canvas.reviewAccess === "paused") {
      throw new Error("Review canvas is currently paused. New comments are temporarily disabled.")
    }

    if (input.userId) {
      const existingUser = await prisma.user.findUnique({
        where: { id: input.userId },
      })
      if (!existingUser) {
        const emailConflict = await prisma.user.findUnique({
          where: { email: validated.authorEmail },
        })
        const safeEmail = emailConflict ? `${input.userId}@annotly.local` : validated.authorEmail

        await prisma.user.create({
          data: {
            id: input.userId,
            email: safeEmail,
            name: validated.authorName,
          },
        })
      }
    }

    const now = new Date()

    const [annotation] = await prisma.$transaction([
      prisma.annotation.create({
        data: {
          canvasId: canvas.id,
          projectId: canvas.projectId,
          userId: input.userId || null,
          authorName: validated.authorName,
          authorEmail: validated.authorEmail,
          elementSelector: validated.elementSelector,
          elementXPath: validated.elementXPath || null,
          elementTag: validated.elementTag || null,
          elementTextSnippet: validated.elementTextSnippet || null,
          offsetX: validated.offsetX,
          offsetY: validated.offsetY,
          viewportWidth: validated.viewportWidth,
          viewportHeight: validated.viewportHeight,
          devicePixelRatio: validated.devicePixelRatio,
          browser: validated.browser || null,
          os: validated.os || null,
          content: validated.content,
          status: "open",
          screenshotUrl: validated.screenshotUrl || null,
        },
      }),
      prisma.project.update({
        where: { id: canvas.projectId },
        data: {
          totalComments: { increment: 1 },
          openComments: { increment: 1 },
          lastActivityAt: now,
        },
      }),
    ])

    return mapAnnotationToDomain(annotation)
  }

  /**
   * Retrieve all annotations on a review canvas with ordered threaded replies.
   */
  static async getCanvasAnnotations(
    canvasToken: string,
    statusFilter?: AnnotationStatus | "all"
  ): Promise<AnnotationDomain[]> {
    const canvas = await prisma.canvas.findUnique({
      where: { token: canvasToken },
      select: { id: true },
    })

    if (!canvas) {
      return []
    }

    const where: { canvasId: string; status?: AnnotationStatus } = { canvasId: canvas.id }
    if (statusFilter && statusFilter !== "all") {
      where.status = statusFilter
    }

    const annotations = await prisma.annotation.findMany({
      where,
      include: {
        replies: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return annotations.map(mapAnnotationToDomain)
  }

  /**
   * Update the status of an annotation (open <-> resolved), strictly verifying authorization.
   */
  static async updateAnnotationStatus(
    actor: ActorContext,
    annotationId: string,
    status: AnnotationStatus
  ): Promise<AnnotationDomain> {
    const { status: newStatus } = updateAnnotationStatusSchema.parse({ status })

    const annotation = await prisma.annotation.findUnique({
      where: { id: annotationId },
      include: { project: { select: { id: true, userId: true } } },
    })

    if (!annotation) {
      throw new Error("Annotation not found.")
    }

    const isProjectOwner = actor.userId && actor.userId === annotation.project.userId
    const isOriginalAuthor =
      (actor.userId && actor.userId === annotation.userId) ||
      (actor.authorEmail && actor.authorEmail.toLowerCase() === annotation.authorEmail.toLowerCase())

    if (!isProjectOwner && !isOriginalAuthor) {
      throw new Error("Forbidden: Only project owners or comment authors can resolve feedback.")
    }

    if (annotation.status === newStatus) {
      return mapAnnotationToDomain(annotation)
    }

    const now = new Date()
    const resolvedBy = newStatus === "resolved" ? (actor.userId || actor.authorEmail || "Anonymous") : null
    const resolvedAt = newStatus === "resolved" ? now : null

    // Calculate delta for project metric rollups
    const openDelta = newStatus === "resolved" ? -1 : 1
    const resolvedDelta = newStatus === "resolved" ? 1 : -1

    const [updated] = await prisma.$transaction([
      prisma.annotation.update({
        where: { id: annotationId },
        data: {
          status: newStatus,
          resolvedAt,
          resolvedBy,
        },
        include: { replies: { orderBy: { createdAt: "asc" } } },
      }),
      prisma.project.update({
        where: { id: annotation.projectId },
        data: {
          openComments: { increment: openDelta },
          resolvedComments: { increment: resolvedDelta },
          lastActivityAt: now,
        },
      }),
    ])

    return mapAnnotationToDomain(updated)
  }

  /**
   * Add a threaded reply to an existing annotation pin.
   */
  static async addReply(input: CreateReplyInput): Promise<AnnotationReplyDomain> {
    const validated = createReplySchema.parse(input)

    const annotation = await prisma.annotation.findUnique({
      where: { id: validated.annotationId },
      include: { canvas: { select: { reviewAccess: true, projectId: true } } },
    })

    if (!annotation) {
      throw new Error("Annotation not found.")
    }

    if (annotation.canvas.reviewAccess === "paused") {
      throw new Error("Review canvas is currently paused. New replies are temporarily disabled.")
    }

    if (input.userId) {
      const existingUser = await prisma.user.findUnique({
        where: { id: input.userId },
      })
      if (!existingUser) {
        const emailConflict = await prisma.user.findUnique({
          where: { email: validated.authorEmail },
        })
        const safeEmail = emailConflict ? `${input.userId}@annotly.local` : validated.authorEmail

        await prisma.user.create({
          data: {
            id: input.userId,
            email: safeEmail,
            name: validated.authorName,
          },
        })
      }
    }

    const now = new Date()

    const [reply] = await prisma.$transaction([
      prisma.annotationReply.create({
        data: {
          annotationId: validated.annotationId,
          userId: input.userId || null,
          authorName: validated.authorName,
          authorEmail: validated.authorEmail,
          content: validated.content,
        },
      }),
      prisma.project.update({
        where: { id: annotation.canvas.projectId },
        data: { lastActivityAt: now },
      }),
    ])

    return mapReplyToDomain(reply)
  }

  /**
   * Delete an annotation pin, strictly verifying ownership or authorship.
   */
  static async deleteAnnotation(actor: ActorContext, annotationId: string): Promise<boolean> {
    const annotation = await prisma.annotation.findUnique({
      where: { id: annotationId },
      include: { project: { select: { id: true, userId: true } } },
    })

    if (!annotation) {
      return false
    }

    const isProjectOwner = actor.userId && actor.userId === annotation.project.userId
    const isOriginalAuthor =
      (actor.userId && actor.userId === annotation.userId) ||
      (actor.authorEmail && actor.authorEmail.toLowerCase() === annotation.authorEmail.toLowerCase())

    if (!isProjectOwner && !isOriginalAuthor) {
      throw new Error("Forbidden: You do not have permission to delete this annotation.")
    }

    const openDelta = annotation.status === "open" ? -1 : 0
    const resolvedDelta = annotation.status === "resolved" ? -1 : 0

    await prisma.$transaction([
      prisma.annotation.delete({
        where: { id: annotationId },
      }),
      prisma.project.update({
        where: { id: annotation.projectId },
        data: {
          totalComments: { decrement: 1 },
          openComments: { increment: openDelta },
          resolvedComments: { increment: resolvedDelta },
        },
      }),
    ])

    return true
  }
}
