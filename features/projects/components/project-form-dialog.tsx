"use client"

import { Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  useProjectForm,
  type ProjectFormResult,
  type ProjectFormValues,
} from "../hooks/use-project-form"
import { ProjectFormFields } from "./project-form-fields"
import type { Project } from "../types"

interface ProjectFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Project | null
  onSubmit: (values: ProjectFormValues) => Promise<ProjectFormResult>
}

function getSubmitLabel(isEditing: boolean, loading: boolean): string {
  if (loading) return isEditing ? "Saving..." : "Creating..."
  return isEditing ? "Save Changes" : "Create Project"
}

export function ProjectFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: ProjectFormDialogProps) {
  const form = useProjectForm({
    open,
    initialData,
    onSubmit,
    onSuccess: () => onOpenChange(false),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            <DialogTitle className="text-lg font-bold">
              {form.isEditing ? "Edit Project Details" : "Create Review Project"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs">
            {form.isEditing
              ? "Update project name, URL, or review status."
              : "Enter target website details to initialize a live interactive review canvas."}
          </DialogDescription>
        </DialogHeader>

        {form.generalError && (
          <Alert variant="destructive">
            <AlertDescription className="text-xs">{form.generalError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={form.handleSubmit} className="space-y-4">
          <ProjectFormFields
            values={form.fields}
            fieldErrors={form.fieldErrors}
            isEditing={form.isEditing}
            onNameChange={form.setName}
            onWebsiteUrlChange={form.setWebsiteUrl}
            onDescriptionChange={form.setDescription}
            onStatusChange={form.setStatus}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={form.loading}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={form.loading}>
              {getSubmitLabel(form.isEditing, form.loading)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
