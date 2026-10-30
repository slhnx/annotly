"use server"

import { revalidatePath } from "next/cache"
import { requireAuthAction } from "@/lib/auth/server"
import { ProjectService } from "../services/project-service"
import {
  createProjectSchema,
  updateProjectSchema,
  projectFilterSchema,
} from "../schemas/project.schema"
import type {
  Project,
  ProjectFilterOptions,
  DashboardMetrics,
  ActionResult,
} from "../types"

/**
 * Server Action: Retrieve projects for the authenticated user.
 */
export async function getProjectsAction(
  filters?: ProjectFilterOptions
): Promise<ActionResult<Project[]>> {
  try {
    const user = await requireAuthAction()
    const validatedFilters = filters ? projectFilterSchema.parse(filters) : undefined
    const projects = await ProjectService.getUserProjects(user.id, validatedFilters)
    return { success: true, data: projects }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load projects."
    return { success: false, error: message }
  }
}

/**
 * Server Action: Retrieve a single project by ID with ownership verification.
 * Does not leak whether the project exists under another user.
 */
export async function getProjectByIdAction(
  projectId: string
): Promise<ActionResult<Project>> {
  try {
    const user = await requireAuthAction()
    const project = await ProjectService.getProjectById(user.id, projectId)
    if (!project) {
      return { success: false, error: "Project not found." }
    }
    return { success: true, data: project }
  } catch {
    return { success: false, error: "Project not found." }
  }
}

/**
 * Server Action: Create a new project.
 */
export async function createProjectAction(
  rawInput: unknown
): Promise<ActionResult<Project>> {
  try {
    const user = await requireAuthAction()
    const parsed = createProjectSchema.safeParse(rawInput)

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".")
        if (!fieldErrors[path]) fieldErrors[path] = []
        fieldErrors[path].push(issue.message)
      }
      return {
        success: false,
        error: "Validation failed. Please check the form errors.",
        fieldErrors,
      }
    }

    const project = await ProjectService.createProject(user.id, parsed.data)

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")

    return { success: true, data: project }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create project."
    if (message.includes("already exists in your workspace")) {
      return {
        success: false,
        error: message,
        fieldErrors: { name: [message] },
      }
    }
    return { success: false, error: message }
  }
}

/**
 * Server Action: Update an existing project.
 */
export async function updateProjectAction(
  projectId: string,
  rawInput: unknown
): Promise<ActionResult<Project>> {
  try {
    const user = await requireAuthAction()
    const parsed = updateProjectSchema.safeParse(rawInput)

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".")
        if (!fieldErrors[path]) fieldErrors[path] = []
        fieldErrors[path].push(issue.message)
      }
      return {
        success: false,
        error: "Validation failed. Please check the form errors.",
        fieldErrors,
      }
    }

    const updated = await ProjectService.updateProject(user.id, projectId, parsed.data)

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${projectId}`)
    revalidatePath(`/dashboard/projects/${projectId}/settings`)

    return { success: true, data: updated }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update project."
    if (message.includes("already exists in your workspace")) {
      return {
        success: false,
        error: message,
        fieldErrors: { name: [message] },
      }
    }
    return { success: false, error: message }
  }
}

/**
 * Server Action: Regenerate review link token for a project.
 */
export async function regenerateReviewLinkAction(
  projectId: string
): Promise<ActionResult<Project>> {
  try {
    const user = await requireAuthAction()
    const updated = await ProjectService.regenerateReviewLink(user.id, projectId)

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${projectId}`)
    revalidatePath(`/dashboard/projects/${projectId}/settings`)

    return { success: true, data: updated }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to regenerate review link."
    return { success: false, error: message }
  }
}

/**
 * Server Action: Delete a project.
 */
export async function deleteProjectAction(
  projectId: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireAuthAction()
    const deleted = await ProjectService.deleteProject(user.id, projectId)

    if (!deleted) {
      return { success: false, error: "Project not found or already deleted." }
    }

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${projectId}`)

    return { success: true, data: { id: projectId } }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete project."
    return { success: false, error: message }
  }
}

/**
 * Server Action: Retrieve dashboard overview aggregate metrics.
 */
export async function getDashboardMetricsAction(): Promise<ActionResult<DashboardMetrics>> {
  try {
    const user = await requireAuthAction()
    const metrics = await ProjectService.getDashboardMetrics(user.id)
    return { success: true, data: metrics }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load metrics."
    return { success: false, error: message }
  }
}

/**
 * Server Action: Seed sample projects for onboarding.
 */
export async function seedSampleProjectsAction(): Promise<ActionResult<Project[]>> {
  try {
    const user = await requireAuthAction()
    const projects = await ProjectService.seedSampleProjects(user.id)

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")

    return { success: true, data: projects }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to seed sample projects."
    return { success: false, error: message }
  }
}
