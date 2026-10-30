"use client"

import { Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PROJECT_STATUS_LABELS } from "../constants"
import { ProjectFilterSelect } from "./project-filter-select"
import type { ProjectStatus } from "../types"

interface ProjectFormFieldsProps {
  values: {
    name: string
    websiteUrl: string
    description: string
    status: ProjectStatus
  }
  fieldErrors: Record<string, string[]>
  isEditing: boolean
  onNameChange: (value: string) => void
  onWebsiteUrlChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onStatusChange: (value: ProjectStatus) => void
}

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) return null
  return (
    <p id={id} className="text-[11px] font-medium text-destructive">
      {messages[0]}
    </p>
  )
}

export function ProjectFormFields({
  values,
  fieldErrors,
  isEditing,
  onNameChange,
  onWebsiteUrlChange,
  onDescriptionChange,
  onStatusChange,
}: ProjectFormFieldsProps) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="project-name" className="text-xs font-semibold">
          Project Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="project-name"
          placeholder="e.g. Acme Marketing Website"
          value={values.name}
          onChange={(e) => onNameChange(e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "project-name-error" : undefined}
          className="text-xs"
        />
        <FieldError id="project-name-error" messages={fieldErrors.name} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="website-url" className="text-xs font-semibold">
          Target Website URL <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Globe
            aria-hidden="true"
            className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="website-url"
            placeholder="https://example.com"
            value={values.websiteUrl}
            onChange={(e) => onWebsiteUrlChange(e.target.value)}
            aria-invalid={Boolean(fieldErrors.websiteUrl)}
            aria-describedby={fieldErrors.websiteUrl ? "website-url-error" : undefined}
            className="pl-9 text-xs"
          />
        </div>
        <FieldError id="website-url-error" messages={fieldErrors.websiteUrl} />
        <p className="text-[10px] text-muted-foreground">
          Reviewers will view and annotate this live URL through Annotly&apos;s reverse proxy.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs font-semibold">
          Description <span className="font-normal text-muted-foreground">(Optional)</span>
        </Label>
        <Textarea
          id="description"
          rows={2}
          placeholder="e.g. Q4 redesign review for client stakeholders"
          value={values.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={fieldErrors.description ? "description-error" : undefined}
          className="min-h-16 resize-none text-xs md:text-xs"
        />
        <FieldError id="description-error" messages={fieldErrors.description} />
      </div>

      {isEditing && (
        <div className="space-y-1.5">
          <Label htmlFor="status" className="text-xs font-semibold">
            Review Status
          </Label>
          <ProjectFilterSelect
            id="status"
            ariaLabel="Review status"
            className="w-full"
            value={values.status}
            items={PROJECT_STATUS_LABELS}
            onValueChange={onStatusChange}
          />
        </div>
      )}
    </>
  )
}
