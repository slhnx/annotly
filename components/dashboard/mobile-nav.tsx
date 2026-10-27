"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarNav } from "./sidebar-nav"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden h-8 w-8 text-[#1c1c1c] hover:bg-[#eceae4] cursor-pointer" />}>
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle navigation menu</span>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0 bg-[#fcfbf8] border-r border-[#eceae4]">
        <SidebarNav onNavClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
