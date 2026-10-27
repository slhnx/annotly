"use client"

import * as React from "react"
import { Globe, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema"
import type { Project, ProjectStatus } from "../types"

interface ProjectFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Project | null
  onSubmit: (values: {
    name: string
    websiteUrl: string
    description?: string
    status?: ProjectStatus
  }) => Promise<{
    success: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
  }>
}

export function ProjectFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: ProjectFormDialogProps) {
  const isEditing = Boolean(initialData)

  const [name, setName] = React.useState("")
  const [websiteUrl, setWebsiteUrl] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [status, setStatus] = React.useState<ProjectStatus>("active")
  const [loading, setLoading] = React.useState(false)
  const [generalError, setGeneralError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({})

  React.useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setWebsiteUrl(initialData.websiteUrl)
      setDescription(initialData.description || "")
      setStatus(initialData.status)
    } else {
      setName("")
      setWebsiteUrl("")
      setDescription("")
      setStatus("active")
    }
    setGeneralError(null)
    setFieldErrors({})
  }, [initialData, open])

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
        onOpenChange(false)
      } else {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
        if (result.error) {
          setGeneralError(result.error)
        }
      }
    } catch (err) {
      setGeneralError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border border-[#eceae4] bg-[#fcfbf8] p-6 text-[#1c1c1c] shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1c1c1c] text-xs font-bold text-[#f7f4ed]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <DialogTitle className="font-heading text-lg font-bold text-[#1c1c1c]">
              {isEditing ? "Edit Project Details" : "Create Review Project"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#5f5f5d]">
            {isEditing
              ? "Update project name, URL, or review status."
              : "Enter target website details to initialize a live interactive review canvas."}
          </DialogDescription>
        </DialogHeader>

        {generalError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Project Name */}
          <div className="space-y-1.5">
            <Label htmlFor="project-name" className="text-xs font-semibold text-[#1c1c1c]">
              Project Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="project-name"
              placeholder="e.g. Acme Marketing Website"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-xs bg-white border-[#eceae4] focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
            />
            {fieldErrors.name && (
              <p className="text-[11px] text-rose-600 font-medium">
                {fieldErrors.name[0]}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div className="space-y-1.5">
            <Label htmlFor="website-url" className="text-xs font-semibold text-[#1c1c1c]">
              Target Website URL <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5f5f5d]" />
              <Input
                id="website-url"
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="h-9 pl-9 text-xs bg-white border-[#eceae4] focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
              />
            </div>
            {fieldErrors.websiteUrl && (
              <p className="text-[11px] text-rose-600 font-medium">
                {fieldErrors.websiteUrl[0]}
              </p>
            )}
            <p className="text-[10px] text-[#5f5f5d]">
              Reviewers will view and annotate this live URL through Annotly&apos;s reverse proxy.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold text-[#1c1c1c]">
              Description <span className="text-[#5f5f5d] font-normal">(Optional)</span>
            </Label>
            <textarea
              id="description"
              rows={2}
              placeholder="e.g. Q4 redesign review for client stakeholders"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-[#eceae4] bg-white p-2.5 text-xs text-[#1c1c1c] shadow-xs outline-none focus:ring-1 focus:ring-[#1c1c1c] resize-none"
            />
            {fieldErrors.description && (
              <p className="text-[11px] text-rose-600 font-medium">
                {fieldErrors.description[0]}
              </p>
            )}
          </div>

          {/* Status (when editing) */}
          {isEditing && (
            <div className="space-y-1.5">
              <Label htmlFor="status" className="text-xs font-semibold text-[#1c1c1c]">
                Review Status
              </Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full h-9 rounded-lg border border-[#eceae4] bg-white px-3 text-xs font-medium text-[#1c1c1c] shadow-xs outline-none cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="in_review">In Review</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          )}

          <DialogFooter className="pt-2 sm:justify-end gap-2 border-t-0 bg-transparent p-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="h-8 border-[#eceae4] text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="h-8 bg-[#1c1c1c] px-4 text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
            >
              {loading
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                ? "Save Changes"
                : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
