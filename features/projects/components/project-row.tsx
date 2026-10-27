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

interface ProjectRowProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectRow({ project, onEdit, onDelete }: ProjectRowProps) {
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-[#f2ede4]/40 transition-colors border-b border-[#eceae4] last:border-b-0">
      {/* Name and URL */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-sm font-semibold text-[#1c1c1c] truncate">
            {project.name}
          </h3>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
              statusStyles[project.status] || statusStyles.active
            }`}
          >
            {project.status.replace("_", " ")}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-xs text-[#5f5f5d]">
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#1c1c1c] truncate max-w-[220px]"
          >
            <Globe className="h-3 w-3 text-[#5f5f5d]/70 shrink-0" />
            <span className="truncate">{project.websiteUrl.replace(/^https?:\/\//, "")}</span>
          </a>

          <span>•</span>

          <span className="inline-flex items-center gap-1">
            <MessageSquare className="h-3 w-3 text-amber-600 shrink-0" />
            <span>
              <strong className="text-[#1c1c1c]">{project.summary.openComments}</strong> open /{" "}
              {project.summary.totalComments} comments
            </span>
          </span>

          <span className="hidden md:inline">•</span>

          <span className="hidden md:inline text-[11px] text-[#5f5f5d]/80">
            Updated {new Date(project.summary.lastActivityAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Row Actions */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleCopyLink}
          className="h-8 gap-1 rounded-lg border-[#eceae4] bg-white px-2.5 text-xs font-semibold text-[#1c1c1c] hover:bg-[#f2ede4] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-[#5f5f5d]" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </Button>

        <Link href={project.reviewUrl} target="_blank">
          <Button
            size="sm"
            className="h-8 gap-1 rounded-lg bg-[#1c1c1c] px-3 text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
          >
            <span>Canvas</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-[#5f5f5d] hover:bg-[#eceae4] hover:text-[#1c1c1c] cursor-pointer"
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
    </div>
  )
}
