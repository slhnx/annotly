"use client"

import * as React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MobileNav } from "./mobile-nav"
import { DashboardBreadcrumbs } from "./breadcrumbs"
import { ThemeToggle } from "./theme-toggle"
import { UserNav } from "./user-nav"

interface TopNavProps {
  user: {
    email?: string | null
    name?: string | null
    avatarUrl?: string | null
  }
}

export function TopNav({ user }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-3">
        <MobileNav />
        <DashboardBreadcrumbs />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          size="sm"
          className="gap-1.5"
          nativeButton={false}
          render={<Link href="/dashboard/projects?action=new" />}
        >
          <Plus className="size-3.5" />
          <span className="hidden sm:inline">New Project</span>
          <span className="sr-only sm:hidden">New Project</span>
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <ThemeToggle />
        <UserNav user={user} />
      </div>
    </header>
  )
}
