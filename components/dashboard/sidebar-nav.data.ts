import { LayoutDashboard, FolderKanban, Settings, type LucideIcon } from "lucide-react"

export interface SidebarNavItem {
  title: string
  href: string
  icon: LucideIcon
  /** When true, the item is active for any pathname that starts with `href`. */
  matchPrefix: boolean
}

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard, matchPrefix: false },
  { title: "Projects", href: "/dashboard/projects", icon: FolderKanban, matchPrefix: true },
  { title: "Settings", href: "/dashboard/settings", icon: Settings, matchPrefix: true },
]

export function isSidebarItemActive(item: SidebarNavItem, pathname: string): boolean {
  return item.matchPrefix ? pathname.startsWith(item.href) : pathname === item.href
}
