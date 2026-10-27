"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink, ArrowRight, Globe, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "../types"

interface RecentProjectsCardProps {
  projects: Project[]
}

export function RecentProjectsCard({ projects }: RecentProjectsCardProps) {
  const recent = projects.slice(0, 5)

  return (
    <div className="flex flex-col rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5 shadow-[0px_1px_3px_rgba(28,28,28,0.02)]">
      <div className="flex items-center justify-between border-b border-[#eceae4] pb-4">
        <div>
          <h2 className="font-heading text-base font-semibold tracking-tight text-[#1c1c1c]">
            Recent Projects
          </h2>
          <p className="text-xs text-[#5f5f5d]">
            Your recently updated visual review workspaces
          </p>
        </div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1c1c1c] hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="divide-y divide-[#eceae4]">
        {recent.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-xs text-[#5f5f5d]">No projects yet.</p>
            <Link href="/dashboard/projects?action=new" className="mt-2 inline-block">
              <Button size="sm" variant="outline" className="h-7 text-xs border-[#eceae4]">
                Create your first project
              </Button>
            </Link>
          </div>
        ) : (
          recent.map((project) => (
            <div
              key={project.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 first:pt-4 last:pb-1"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-xs sm:text-sm font-semibold text-[#1c1c1c] truncate">
                    {project.name}
                  </h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      project.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : project.status === "in_review"
                        ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                        : "bg-gray-100 text-gray-700 border border-gray-200/60"
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
                    className="inline-flex items-center gap-1 hover:text-[#1c1c1c] truncate max-w-[200px]"
                  >
                    <Globe className="h-3 w-3 text-[#5f5f5d]/70 shrink-0" />
                    <span className="truncate">{project.websiteUrl.replace(/^https?:\/\//, "")}</span>
                  </a>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-[#5f5f5d]/70 shrink-0" />
                    <span>
                      {project.summary.openComments} open / {project.summary.totalComments} total
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link href={project.reviewUrl} target="_blank">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 rounded-lg border-[#eceae4] bg-white px-2.5 text-xs font-semibold text-[#1c1c1c] hover:bg-[#f2ede4] cursor-pointer"
                  >
                    <span>Open Canvas</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
