"use client"

import * as React from "react"
import { SidebarNav } from "./sidebar-nav"
import { TopNav } from "./top-nav"

interface DashboardShellProps {
  user: {
    id: string
    email?: string | null
    name?: string | null
    avatarUrl?: string | null
  }
  children: React.ReactNode
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1c1c]">
      {/* Desktop Sidebar (fixed left) */}
      <div className="hidden md:fixed md:inset-y-0 md:z-40 md:flex md:w-64 md:flex-col">
        <SidebarNav />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:pl-64 min-h-screen">
        <TopNav user={user} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
