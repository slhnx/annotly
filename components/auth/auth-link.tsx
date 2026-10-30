import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AuthLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function AuthLink({ href, children, className }: AuthLinkProps) {
  return (
    <Button
      variant="link"
      nativeButton={false}
      render={<Link href={href} />}
      className={cn("inline-flex align-baseline text-xs font-semibold", className)}
    >
      {children}
    </Button>
  )
}
