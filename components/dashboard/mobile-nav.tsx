"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarNav } from "./sidebar-nav"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="size-4" />
        <span className="sr-only">Toggle navigation menu</span>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-sidebar p-0 text-sidebar-foreground">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarNav onNavClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
