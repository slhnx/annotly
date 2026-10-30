"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Overview",
  projects: "Projects",
  settings: "Settings",
  reviews: "Reviews",
  new: "New Project",
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumbs" className="flex items-center text-xs text-muted-foreground">
      <ol className="flex items-center space-x-1.5">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1
          const label =
            ROUTE_LABELS[segment] ||
            (segment.startsWith("prj_") ? "Project" : segment.replace(/-/g, " "))

          return (
            <li key={path} className="flex items-center space-x-1.5">
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
              {isLast ? (
                <span className="font-semibold text-foreground capitalize" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={path}
                  className="capitalize transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
