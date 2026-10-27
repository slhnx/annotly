"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCards } from "./stats-cards"
import { RecentProjectsCard } from "./recent-projects-card"
import { OnboardingCard } from "./onboarding-card"
import type { Project, DashboardMetrics } from "../types"

interface DashboardOverviewProps {
  user: {
    name?: string | null
    email?: string | null
  }
  projects: Project[]
  metrics: DashboardMetrics
  onSeedSample?: () => void
  isSeeding?: boolean
}

export function DashboardOverview({
  user,
  projects,
  metrics,
  onSeedSample,
  isSeeding,
}: DashboardOverviewProps) {
  const displayName = user.name || user.email?.split("@")[0] || "Reviewer"
  const isFirstRun = projects.length === 0

  return (
    <div className="space-y-6">
      {/* Header section with title and quick CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#1c1c1c]">
            Welcome back, {displayName}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5f5f5d]">
            Here is what&apos;s happening across your website review canvases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/projects?action=new">
            <Button
              size="sm"
              className="h-9 gap-1.5 rounded-lg bg-[#1c1c1c] px-4 text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Create Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Aggregate stats cards */}
      <StatsCards metrics={metrics} />

      {/* Onboarding card: displayed on first run or zero projects */}
      {isFirstRun ? (
        <OnboardingCard onSeedSample={onSeedSample} isSeeding={isSeeding} />
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-[#eceae4] bg-[#fcfbf8] px-4 py-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[#5f5f5d]">
              Zero-install review links are ready to share with your clients.
            </span>
          </div>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-1 font-semibold text-[#1c1c1c] hover:underline"
          >
            <span>Browse all projects</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* Recent Projects Table / List */}
      <RecentProjectsCard projects={projects} />
    </div>
  )
}
