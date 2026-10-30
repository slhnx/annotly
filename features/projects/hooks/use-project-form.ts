"use client"

import * as React from "react"
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema"
import type { Project, ProjectStatus } from "../types"

export interface ProjectFormValues {
  name: string
  websiteUrl: string
  description?: string
  status?: ProjectStatus
}

export interface ProjectFormResult {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

interface UseProjectFormOptions {
  open: boolean
  initialData?: Project | null
  onSubmit: (values: ProjectFormValues) => Promise<ProjectFormResult>
  onSuccess: () => void
}

export function useProjectForm({ open, initialData, onSubmit, onSuccess }: UseProjectFormOptions) {
  const isEditing = Boolean(initialData)

  const [name, setName] = React.useState(initialData?.name ?? "")
  const [websiteUrl, setWebsiteUrl] = React.useState(initialData?.websiteUrl ?? "")
  const [description, setDescription] = React.useState(initialData?.description ?? "")
  const [status, setStatus] = React.useState<ProjectStatus>(initialData?.status ?? "active")
  const [loading, setLoading] = React.useState(false)
  const [generalError, setGeneralError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({})

  // Reset the form whenever the dialog opens/closes or targets a different project.
  const [syncedSource, setSyncedSource] = React.useState({ initialData, open })
  if (syncedSource.initialData !== initialData || syncedSource.open !== open) {
    setSyncedSource({ initialData, open })
    setName(initialData?.name ?? "")
    setWebsiteUrl(initialData?.websiteUrl ?? "")
    setDescription(initialData?.description ?? "")
    setStatus(initialData?.status ?? "active")
    setGeneralError(null)
    setFieldErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)
    setFieldErrors({})

    const schema = isEditing ? updateProjectSchema : createProjectSchema
    const parseResult = schema.safeParse({
      name,
      websiteUrl,
      description: description || undefined,
      ...(isEditing ? { status } : {}),
    })

    if (!parseResult.success) {
      const errMap: Record<string, string[]> = {}
      for (const issue of parseResult.error.issues) {
        const key = issue.path.join(".")
        if (!errMap[key]) errMap[key] = []
        errMap[key].push(issue.message)
      }
      setFieldErrors(errMap)
      return
    }

    setLoading(true)
    try {
      const result = await onSubmit({
        name,
        websiteUrl: parseResult.data.websiteUrl || websiteUrl,
        description: description || undefined,
        status: isEditing ? status : undefined,
      })

      if (result.success) {
        onSuccess()
        return
      }
      if (result.fieldErrors) setFieldErrors(result.fieldErrors)
      if (result.error) setGeneralError(result.error)
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return {
    isEditing,
    loading,
    generalError,
    fieldErrors,
    fields: { name, websiteUrl, description, status },
    setName,
    setWebsiteUrl,
    setDescription,
    setStatus,
    handleSubmit,
  }
}
