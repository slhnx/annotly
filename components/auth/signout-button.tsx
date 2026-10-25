"use client"

import * as React from "react"
import { useTransition } from "react"
import { LogOut, Loader2 } from "lucide-react"
import { signoutAction } from "@/app/(auth)/actions"
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
  const [isPending, startTransition] = useTransition()

  const handleSignout = () => {
    startTransition(async () => {
      await signoutAction()
    })
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleSignout}
      disabled={isPending}
      className={cn("text-xs font-medium cursor-pointer", className)}
      {...props}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          {showIcon && <LogOut className="mr-1.5 h-3.5 w-3.5" />}
          {children || "Sign out"}
        </>
      )}
    </Button>
  )
}
