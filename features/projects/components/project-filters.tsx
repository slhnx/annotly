"use client"

import * as React from "react"
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ProjectStatus } from "../types"

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: ProjectStatus | "all"
  onStatusChange: (status: ProjectStatus | "all") => void
  sortBy: "lastActivity" | "createdAt" | "name"
  onSortByChange: (sort: "lastActivity" | "createdAt" | "name") => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-3 shadow-[0px_1px_3px_rgba(28,28,28,0.02)]">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5f5f5d]" />
        <Input
          type="text"
          placeholder="Search by project name or website URL..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 pl-9 pr-3 text-xs bg-white border-[#eceae4] focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Status Filter */}
        <div className="flex items-center">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as ProjectStatus | "all")}
            className="h-9 rounded-lg border border-[#eceae4] bg-white px-2.5 text-xs font-medium text-[#1c1c1c] shadow-xs outline-none hover:bg-[#f7f4ed] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="in_review">In Review</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center">
          <select
            value={sortBy}
            onChange={(e) =>
              onSortByChange(
                e.target.value as "lastActivity" | "createdAt" | "name"
              )
            }
            className="h-9 rounded-lg border border-[#eceae4] bg-white px-2.5 text-xs font-medium text-[#1c1c1c] shadow-xs outline-none hover:bg-[#f7f4ed] cursor-pointer"
          >
            <option value="lastActivity">Recent Activity</option>
            <option value="createdAt">Date Created</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center rounded-lg border border-[#eceae4] bg-white p-0.5 shadow-xs">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={`h-7 w-7 p-0 cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#1c1c1c] text-white hover:bg-[#1c1c1c]"
                : "text-[#5f5f5d] hover:bg-[#eceae4]/60"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="sr-only">Grid View</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={`h-7 w-7 p-0 cursor-pointer ${
              viewMode === "list"
                ? "bg-[#1c1c1c] text-white hover:bg-[#1c1c1c]"
                : "text-[#5f5f5d] hover:bg-[#eceae4]/60"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span className="sr-only">List View</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
