"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProjectFormFields } from "../project-form-fields"
import { ProjectGeneralSettingsFooter } from "./project-general-settings-footer"
import { useUnsavedChanges } from "../../hooks/use-unsaved-changes"
import { updateProjectAction } from "../../actions"
import type { Project, ProjectStatus } from "../../types"

interface ProjectGeneralSettingsCardProps {
  project: Project
}

export function ProjectGeneralSettingsCard({ project }: ProjectGeneralSettingsCardProps) {
  const [savedData, setSavedData] = React.useState({
    name: project.name,
    websiteUrl: project.websiteUrl,
    description: project.description || "",
    status: project.status,
  })

  const [formValues, setFormValues] = React.useState(savedData)
  const [loading, setLoading] = React.useState(false)
  const [generalError, setGeneralError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({})
  const [saveSuccess, setSaveSuccess] = React.useState(false)

  const { isDirty } = useUnsavedChanges({
    initialValues: savedData,
    currentValues: formValues,
  })

  const handleReset = () => {
    setFormValues(savedData)
    setGeneralError(null)
    setFieldErrors({})
    setSaveSuccess(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setGeneralError(null)
    setFieldErrors({})
    setSaveSuccess(false)

    try {
      const res = await updateProjectAction(project.id, {
        name: formValues.name,
        websiteUrl: formValues.websiteUrl,
        description: formValues.description,
        status: formValues.status,
      })

      if (res.success && res.data) {
        const nextSaved = {
          name: res.data.name,
          websiteUrl: res.data.websiteUrl,
          description: res.data.description || "",
          status: res.data.status,
        }
        setSavedData(nextSaved)
        setFormValues(nextSaved)
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        if (res.fieldErrors) setFieldErrors(res.fieldErrors)
        if (res.error) setGeneralError(res.error)
      }
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : "Failed to update project.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-foreground">
            General Settings
          </CardTitle>
          {isDirty && (
            <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400">
              Unsaved changes
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Update your project&apos;s display name, target website URL, description, or review status.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSave}>
        <CardContent className="space-y-4 pt-0">
          {saveSuccess && (
            <Alert className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
              <AlertDescription className="text-xs font-medium">
                Project settings saved successfully.
              </AlertDescription>
            </Alert>
          )}

          {generalError && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">{generalError}</AlertDescription>
            </Alert>
          )}

          <ProjectFormFields
            values={formValues}
            fieldErrors={fieldErrors}
            isEditing={true}
            onNameChange={(name) => setFormValues((prev) => ({ ...prev, name }))}
            onWebsiteUrlChange={(websiteUrl) => setFormValues((prev) => ({ ...prev, websiteUrl }))}
            onDescriptionChange={(description) => setFormValues((prev) => ({ ...prev, description }))}
            onStatusChange={(status: ProjectStatus) => setFormValues((prev) => ({ ...prev, status }))}
          />
        </CardContent>

        <ProjectGeneralSettingsFooter
          isDirty={isDirty}
          loading={loading}
          saveSuccess={saveSuccess}
          onReset={handleReset}
        />
      </form>
    </Card>
  )
}
