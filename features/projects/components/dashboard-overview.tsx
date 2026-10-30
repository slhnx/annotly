"use client"

import Link from "next/link"
import { Plus, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatsCards } from "./stats-cards"
import { RecentProjectsCard } from "./recent-projects-card"
import type { Project, DashboardMetrics } from "../types"

interface DashboardOverviewProps {
  user: {
    name?: string | null
    email?: string | null
  }
  projects: Project[]
  metrics: DashboardMetrics
}

function ShareReadyBanner() {
  return (
    <Card
      size="sm"
      className="flex-row items-center justify-between px-4 py-3 text-xs"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="size-2 rounded-full bg-success" />
        <span className="text-muted-foreground">
          Zero-install review links are ready to share with your clients.
        </span>
      </div>
      <Button
        variant="link"
        size="sm"
        nativeButton={false}
        className="h-auto gap-1 p-0 text-xs font-semibold"
        render={<Link href="/dashboard/projects" />}
      >
        <span>Browse all projects</span>
        <ArrowUpRight className="size-3" />
      </Button>
    </Card>
  )
}

export function DashboardOverview({
  user,
  projects,
  metrics,
}: DashboardOverviewProps) {
  const displayName = user.name || user.email?.split("@")[0] || "Reviewer"
  const isFirstRun = projects.length === 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Welcome back, {displayName}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Here is what&apos;s happening across your website review canvases.
          </p>
        </div>

        <Button
          nativeButton={false}
          className="gap-1.5 px-4 text-xs font-semibold"
          render={<Link href="/dashboard/projects?action=new" />}
        >
          <Plus className="size-4" />
          <span>Create Project</span>
        </Button>
      </div>

      <StatsCards metrics={metrics} />

      {!isFirstRun && <ShareReadyBanner />}

      <RecentProjectsCard projects={projects} />
    </div>
  )
}
