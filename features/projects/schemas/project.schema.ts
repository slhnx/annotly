import { z } from "zod"

/**
 * Normalizes input URL strings by prepending https:// if protocol is omitted.
 */
export function sanitizeUrl(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Project name must be at least 2 characters." })
    .max(100, { message: "Project name cannot exceed 100 characters." }),
  websiteUrl: z
    .string()
    .trim()
    .min(1, { message: "Website URL is required." })
    .transform(sanitizeUrl)
    .pipe(
      z
        .string()
        .url({ message: "Please provide a valid website URL (e.g. https://example.com)." })
        .refine(
          (url) => {
            try {
              const parsed = new URL(url)
              return (
                (parsed.protocol === "http:" || parsed.protocol === "https:") &&
                parsed.hostname.includes(".")
              )
            } catch {
              return false
            }
          },
          { message: "Website URL must include a valid domain name." }
        )
    ),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional()
    .or(z.literal("")),
})

export const updateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Project name must be at least 2 characters." })
    .max(100, { message: "Project name cannot exceed 100 characters." })
    .optional(),
  websiteUrl: z
    .string()
    .trim()
    .transform(sanitizeUrl)
    .pipe(
      z
        .string()
        .url({ message: "Please provide a valid website URL." })
        .refine(
          (url) => {
            try {
              const parsed = new URL(url)
              return (
                (parsed.protocol === "http:" || parsed.protocol === "https:") &&
                parsed.hostname.includes(".")
              )
            } catch {
              return false
            }
          },
          { message: "Website URL must include a valid domain name." }
        )
    )
    .optional(),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional()
    .or(z.literal("")),
  status: z.enum(["active", "in_review", "completed", "archived"]).optional(),
})

export const projectFilterSchema = z.object({
  query: z.string().optional(),
  status: z.enum(["all", "active", "in_review", "completed", "archived"]).optional(),
  sortBy: z.enum(["lastActivity", "createdAt", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
})

export type CreateProjectSchemaInput = z.input<typeof createProjectSchema>
export type CreateProjectSchemaOutput = z.output<typeof createProjectSchema>
export type UpdateProjectSchemaInput = z.input<typeof updateProjectSchema>
export type UpdateProjectSchemaOutput = z.output<typeof updateProjectSchema>
