import { z } from "zod"

/**
 * Normalizes input URL strings by prepending https:// if protocol is omitted
 * and lowercasing the hostname.
 */
export function sanitizeUrl(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return trimmed
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(withProtocol)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return withProtocol
    }
    parsed.hostname = parsed.hostname.toLowerCase()
    if (parsed.pathname === "/" && !withProtocol.endsWith("/")) {
      return `${parsed.protocol}//${parsed.host}${parsed.search}${parsed.hash}`
    }
    return parsed.toString()
  } catch {
    return withProtocol
  }
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
  reviewAccess: z.enum(["public", "paused"]).optional(),
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
  reviewAccess: z.enum(["public", "paused"]).optional(),
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
