"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Sparkles,
  ExternalLink,
} from "lucide-react"

interface SidebarNavProps {
  onNavClick?: () => void
}

export function SidebarNav({ onNavClick }: SidebarNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: FolderKanban,
      active: pathname.startsWith("/dashboard/projects"),
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      active: pathname.startsWith("/dashboard/settings"),
    },
  ]

  return (
    <aside className="flex h-full w-full flex-col justify-between p-4 bg-[#fcfbf8] border-r border-[#eceae4]">
      <div className="flex flex-col space-y-6">
        {/* Brand / Workspace Header */}
        <div className="flex items-center justify-between px-2 py-1">
          <Link
            href="/dashboard"
            onClick={onNavClick}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1c1c] text-sm font-bold text-[#f7f4ed] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              A
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold tracking-tight text-[#1c1c1c]">
                Annotly
              </span>
              <span className="text-[10px] text-[#5f5f5d] font-medium tracking-wide uppercase">
                Studio Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Main Navigation" className="flex flex-col space-y-1">
          <div className="px-2 pb-1 text-[11px] font-semibold tracking-wider text-[#5f5f5d]/70 uppercase">
            Platform
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  item.active
                    ? "bg-[#1c1c1c] text-[#f7f4ed] shadow-sm font-semibold"
                    : "text-[#5f5f5d] hover:bg-[#eceae4]/60 hover:text-[#1c1c1c]"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    item.active ? "text-[#f7f4ed]" : "text-[#5f5f5d]"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Review Canvas Helper Banner */}
      <div className="rounded-xl border border-[#eceae4] bg-[#f7f4ed] p-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-[#1c1c1c] font-semibold mb-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Zero-Install Reviews</span>
        </div>
        <p className="text-[11px] text-[#5f5f5d] leading-relaxed mb-2.5">
          Share live review canvases with clients without extensions or account logins.
        </p>
        <Link
          href="/dashboard/projects"
          onClick={onNavClick}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1c1c1c] hover:underline"
        >
          <span>Manage projects</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  )
}
