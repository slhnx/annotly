"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Globe, Sparkles } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useProjectForm, type ProjectFormValues } from "../hooks/use-project-form"
import { ProjectFormFields } from "./project-form-fields"
import { createProjectAction } from "../actions"
import { sanitizeUrl } from "../schemas/project.schema"
import type { Project } from "../types"

export function NewProjectForm() {
  const router = useRouter()

  const handleCreate = async (values: ProjectFormValues) => {
    return await createProjectAction({
      name: values.name,
      websiteUrl: values.websiteUrl,
      description: values.description,
    })
  }

  const handleSuccess = (project?: Project) => {
    if (project?.id) {
      router.push(`/dashboard/projects/${project.id}`)
    } else {
      router.push("/dashboard/projects")
    }
  }

  const form = useProjectForm({
    onSubmit: handleCreate,
    onSuccess: handleSuccess,
  })

  const normalizedPreview = React.useMemo(() => {
    if (!form.fields.websiteUrl.trim()) return null
    return sanitizeUrl(form.fields.websiteUrl)
  }, [form.fields.websiteUrl])

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-3.5" />
          </span>
          <CardTitle className="text-base font-bold text-foreground">
            Project Information
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Enter the website identity and target URL to generate a live review canvas.
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit}>
        <CardContent className="space-y-4 pt-0">
          {form.generalError && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">{form.generalError}</AlertDescription>
            </Alert>
          )}

          <ProjectFormFields
            values={form.fields}
            fieldErrors={form.fieldErrors}
            isEditing={false}
            onNameChange={form.setName}
            onWebsiteUrlChange={form.setWebsiteUrl}
            onDescriptionChange={form.setDescription}
            onStatusChange={form.setStatus}
          />

          {normalizedPreview && (
            <div className="flex items-center gap-2 rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-xs">
              <Globe className="size-3.5 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 items-center gap-1.5 overflow-hidden text-xs">
                <span className="shrink-0 text-muted-foreground">Normalized Target:</span>
                <span className="truncate font-mono font-medium text-foreground">
                  {normalizedPreview}
                </span>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/80 pt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={form.loading}
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button type="submit" size="sm" disabled={form.loading} className="gap-1.5">
            <span>{form.loading ? "Initializing..." : "Create Project"}</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
