"use client"

import * as React from "react"
import Link from "next/link"
import { Loader2, LogOut, Settings, FolderKanban, LayoutDashboard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSignoutMutation } from "@/lib/auth/queries"

interface UserNavProps {
  user: {
    email?: string | null
    name?: string | null
    avatarUrl?: string | null
  }
}

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const

export function UserNav({ user }: UserNavProps) {
  const signoutMutation = useSignoutMutation()
  const displayName = user.name || user.email?.split("@")[0] || "Reviewer"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-pill" className="p-0" />}
      >
        <Avatar>
          {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
          <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
            {initials || "U"}
          </AvatarFallback>
        </Avatar>
        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-1 px-1.5 py-1.5 font-normal">
            <span className="text-sm leading-none font-semibold tracking-tight text-foreground">
              {displayName}
            </span>
            <span className="truncate text-xs leading-none text-muted-foreground">
              {user.email || "reviewer@annotly.com"}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem key={href} render={<Link href={href} />}>
              <Icon className="text-muted-foreground" />
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={signoutMutation.isPending}
          onClick={() => signoutMutation.mutate()}
        >
          {signoutMutation.isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
          <span>{signoutMutation.isPending ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
