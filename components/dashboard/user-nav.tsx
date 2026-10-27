"use client"

import * as React from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SignoutButton } from "@/components/auth/signout-button"
import { User, Settings, FolderKanban, LayoutDashboard } from "lucide-react"

interface UserNavProps {
  user: {
    email?: string | null
    name?: string | null
    avatarUrl?: string | null
  }
}

export function UserNav({ user }: UserNavProps) {
  const displayName = user.name || user.email?.split("@")[0] || "Reviewer"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 cursor-pointer hover:bg-[#eceae4]" />}>
        <Avatar className="h-9 w-9 rounded-full border border-[#eceae4] bg-[#f2ede4] text-[#1c1c1c]">
          <AvatarFallback className="bg-[#1c1c1c] text-xs font-semibold text-[#f7f4ed]">
            {initials || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-1.5 shadow-lg text-[#1c1c1c]"
        align="end"
      >
        <DropdownMenuLabel className="font-normal px-2 py-1.5">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold tracking-tight leading-none text-[#1c1c1c]">
              {displayName}
            </p>
            <p className="text-xs leading-none text-[#5f5f5d] truncate">
              {user.email || "reviewer@annotly.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-[#eceae4]" />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5 text-xs text-[#1c1c1c] rounded-md hover:bg-[#f2ede4] cursor-pointer" />}>
            <LayoutDashboard className="h-3.5 w-3.5 text-[#5f5f5d]" />
            <span>Overview</span>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/dashboard/projects" className="flex items-center gap-2 px-2 py-1.5 text-xs text-[#1c1c1c] rounded-md hover:bg-[#f2ede4] cursor-pointer" />}>
            <FolderKanban className="h-3.5 w-3.5 text-[#5f5f5d]" />
            <span>Projects</span>
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/dashboard/settings" className="flex items-center gap-2 px-2 py-1.5 text-xs text-[#1c1c1c] rounded-md hover:bg-[#f2ede4] cursor-pointer" />}>
            <Settings className="h-3.5 w-3.5 text-[#5f5f5d]" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-[#eceae4]" />

        <div className="p-1">
          <SignoutButton
            variant="ghost"
            className="w-full justify-start text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1.5 h-auto rounded-md font-medium"
          >
            Sign out
          </SignoutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
