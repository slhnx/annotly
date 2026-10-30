"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SIDEBAR_NAV_ITEMS, isSidebarItemActive } from "./sidebar-nav.data"
import { SidebarPromo } from "./sidebar-promo"

interface SidebarNavProps {
  onNavClick?: () => void
}

export function SidebarNav({ onNavClick }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-full flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between px-2 py-1">
          <Link
            href="/dashboard"
            onClick={onNavClick}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-button-inset">
              A
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold tracking-tight text-foreground">
                Annotly
              </span>
              <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Studio Workspace
              </span>
            </div>
          </Link>
        </div>

        <nav aria-label="Main Navigation" className="flex flex-col space-y-1">
          <div className="px-2 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Platform
          </div>
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isSidebarItemActive(item, pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavClick}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  active
                    ? "bg-primary font-semibold text-primary-foreground shadow-button-inset"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="size-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <SidebarPromo onNavClick={onNavClick} />
    </aside>
  )
}
