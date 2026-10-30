import { z } from "zod"

export const updateCanvasAccessSchema = z.object({
  reviewAccess: z.enum(["public", "paused"], {
    message: "Review access must be either 'public' or 'paused'.",
  }),
})

export type UpdateCanvasAccessSchema = z.infer<typeof updateCanvasAccessSchema>
