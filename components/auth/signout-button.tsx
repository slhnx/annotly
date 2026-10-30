"use client"

import * as React from "react"
import { LogOut, Loader2 } from "lucide-react"
import { useSignoutMutation } from "@/lib/auth/queries"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SignoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "surface" | "secondary" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm"
  showIcon?: boolean
}

export function SignoutButton({
  className,
  variant = "outline",
  size = "sm",
  showIcon = true,
  children,
  ...props
}: SignoutButtonProps) {
  const signoutMutation = useSignoutMutation()

  const handleSignout = () => {
    signoutMutation.mutate()
  }

  const isPending = signoutMutation.isPending

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleSignout}
      disabled={isPending}
      className={cn("text-xs font-medium", className)}
      {...props}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-1.5 size-3.5 animate-spin" aria-hidden="true" />
          Signing out...
        </>
      ) : (
        <>
          {showIcon && <LogOut className="mr-1.5 size-3.5" aria-hidden="true" />}
          {children || "Sign out"}
        </>
      )}
    </Button>
  )
}
