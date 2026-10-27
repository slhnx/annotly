"use client"

import * as React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { DashboardBreadcrumbs } from "./breadcrumbs"
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
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[#eceae4] bg-[#fcfbf8]/95 px-4 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <MobileNav />
        <DashboardBreadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        <Link href="/dashboard/projects?action=new">
          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-lg bg-[#1c1c1c] px-3 text-xs font-semibold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#2b2b2b] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </Link>
        <div className="h-4 w-px bg-[#eceae4]" />
        <UserNav user={user} />
      </div>
    </header>
  )
}
