"use client"

import * as React from "react"
import Link from "next/link"
import {
  Globe,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Project } from "../types"

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const fullUrl = `${origin}${project.reviewUrl}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusStyles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    in_review: "bg-purple-50 text-purple-700 border-purple-200/60",
    completed: "bg-blue-50 text-blue-700 border-blue-200/60",
    archived: "bg-gray-100 text-gray-700 border-gray-200/60",
  }

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5 shadow-[0px_1px_3px_rgba(28,28,28,0.02)] transition-all hover:border-[#dedbd3] hover:shadow-[0px_3px_10px_rgba(28,28,28,0.04)]">
      <div>
        {/* Top Header: Status & Menu */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
              statusStyles[project.status] || statusStyles.active
            }`}
          >
            {project.status.replace("_", " ")}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-[#5f5f5d] hover:bg-[#eceae4] hover:text-[#1c1c1c] cursor-pointer"
                />
              }
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-1.5 shadow-lg text-xs"
            >
              <DropdownMenuItem
                onClick={() => onEdit(project)}
                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md hover:bg-[#f2ede4]"
              >
                <Pencil className="h-3.5 w-3.5 text-[#5f5f5d]" />
                <span>Edit Project</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                render={
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md hover:bg-[#f2ede4]"
                  />
                }
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#5f5f5d]" />
                <span>Visit Website</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-[#eceae4]" />

              <DropdownMenuItem
                onClick={() => onDelete(project)}
                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Project Name & Description */}
        <div className="mt-3">
          <h3 className="font-heading text-base font-bold text-[#1c1c1c] truncate">
            {project.name}
          </h3>
          <p className="mt-1 text-xs text-[#5f5f5d] line-clamp-2 min-h-[32px]">
            {project.description || "No description provided."}
          </p>
        </div>

        {/* Website URL badge */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#5f5f5d]">
          <Globe className="h-3.5 w-3.5 shrink-0 text-[#5f5f5d]/70" />
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:text-[#1c1c1c] hover:underline"
          >
            {project.websiteUrl.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>

      <div className="mt-5 border-t border-[#eceae4] pt-4">
        {/* Comments & Activity summary */}
        <div className="flex items-center justify-between text-xs text-[#5f5f5d] mb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
            <span>
              <strong className="text-[#1c1c1c]">{project.summary.openComments}</strong> open /{" "}
              {project.summary.totalComments} total
            </span>
          </div>

          <span className="text-[11px] text-[#5f5f5d]/80">
            {new Date(project.summary.lastActivityAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="h-8 gap-1.5 rounded-lg border-[#eceae4] bg-white text-xs font-semibold text-[#1c1c1c] hover:bg-[#f2ede4] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-[#5f5f5d]" />
                <span>Share Link</span>
              </>
            )}
          </Button>

          <Link href={project.reviewUrl} target="_blank" className="w-full">
            <Button
              size="sm"
              className="w-full h-8 gap-1.5 rounded-lg bg-[#1c1c1c] text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
            >
              <span>Canvas</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
