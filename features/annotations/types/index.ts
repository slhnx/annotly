export type AnnotationStatus = "open" | "in_progress" | "resolved"

export interface AnnotationReplyDomain {
  id: string
  annotationId: string
  userId: string | null
  authorName: string
  authorEmail: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface AnnotationDomain {
  id: string
  canvasId: string
  projectId: string
  userId: string | null
  authorName: string
  authorEmail: string
  elementSelector: string
  elementXPath: string | null
  elementTag: string | null
  elementTextSnippet: string | null
  offsetX: number
  offsetY: number
  viewportWidth: number
  viewportHeight: number
  devicePixelRatio: number
  browser: string | null
  os: string | null
  content: string
  status: AnnotationStatus
  screenshotUrl: string | null
  resolvedAt: string | null
  resolvedBy: string | null
  createdAt: string
  updatedAt: string
  replies?: AnnotationReplyDomain[]
}

export interface CreateAnnotationInput {
  canvasToken: string
  userId?: string | null
  authorName: string
  authorEmail: string
  content: string
  elementSelector: string
  elementXPath?: string | null
  elementTag?: string | null
  elementTextSnippet?: string | null
  offsetX: number
  offsetY: number
  viewportWidth: number
  viewportHeight: number
  devicePixelRatio?: number
  browser?: string | null
  os?: string | null
  screenshotUrl?: string | null
}

export interface CreateReplyInput {
  annotationId: string
  userId?: string | null
  authorName: string
  authorEmail: string
  content: string
}

export interface ActorContext {
  userId?: string
  authorEmail?: string
}
