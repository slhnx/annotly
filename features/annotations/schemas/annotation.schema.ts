import { z } from "zod"

export const createAnnotationSchema = z.object({
  canvasToken: z.string().min(1, "Canvas token is required."),
  content: z.string().trim().min(1, "Comment content cannot be empty.").max(5000, "Comment cannot exceed 5000 characters."),
  elementSelector: z.string().trim().min(1, "Element selector is required."),
  elementXPath: z.string().trim().optional().nullable(),
  elementTag: z.string().trim().optional().nullable(),
  elementTextSnippet: z.string().trim().max(300).optional().nullable(),
  offsetX: z.number().min(0, "Offset X cannot be negative.").max(100, "Offset X cannot exceed 100%."),
  offsetY: z.number().min(0, "Offset Y cannot be negative.").max(100, "Offset Y cannot exceed 100%."),
  viewportWidth: z.number().int().min(280, "Viewport width must be at least 280px.").max(7680, "Viewport width is too large."),
  viewportHeight: z.number().int().min(200, "Viewport height must be at least 200px.").max(7680, "Viewport height is too large."),
  devicePixelRatio: z.number().min(0.25).max(10).default(1.0),
  browser: z.string().trim().max(100).optional().nullable(),
  os: z.string().trim().max(100).optional().nullable(),
  authorName: z.string().trim().min(1, "Author name is required.").max(100, "Author name cannot exceed 100 characters."),
  authorEmail: z.string().trim().email("Please enter a valid email address."),
  screenshotUrl: z.string().trim().url().optional().nullable().or(z.literal("")),
})

export const createReplySchema = z.object({
  annotationId: z.string().min(1, "Annotation ID is required."),
  content: z.string().trim().min(1, "Reply content cannot be empty.").max(5000, "Reply cannot exceed 5000 characters."),
  authorName: z.string().trim().min(1, "Author name is required.").max(100, "Author name cannot exceed 100 characters."),
  authorEmail: z.string().trim().email("Please enter a valid email address."),
})

export const updateAnnotationStatusSchema = z.object({
  status: z.enum(["open", "in_progress", "resolved"], {
    message: "Status must be 'open', 'in_progress', or 'resolved'.",
  }),
})

export type CreateAnnotationSchema = z.infer<typeof createAnnotationSchema>
export type CreateReplySchema = z.infer<typeof createReplySchema>
export type UpdateAnnotationStatusSchema = z.infer<typeof updateAnnotationStatusSchema>
