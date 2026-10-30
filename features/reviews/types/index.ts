import type { ReviewAccess } from "@/features/projects/types"

export type { ReviewAccess }

export interface CanvasDomain {
  id: string
  projectId: string
  token: string
  name: string
  url: string
  reviewAccess: ReviewAccess
  createdAt: string
  updatedAt: string
}

export interface PublicReviewCanvas {
  id: string
  token: string
  name: string
  url: string
  reviewAccess: ReviewAccess
  projectId: string
  projectName: string
  projectStatus: string
  totalComments: number
  openComments: number
  resolvedComments: number
}

export interface UpdateCanvasAccessInput {
  reviewAccess: ReviewAccess
}
