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
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar (fixed left) */}
      <div className="hidden md:fixed md:inset-y-0 md:z-40 md:flex md:w-64 md:flex-col">
        <SidebarNav />
      </div>

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-col md:pl-64">
        <TopNav user={user} />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
