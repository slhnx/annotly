"use client"

import * as React from "react"
import Link from "next/link"
import { useActionState } from "react"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { loginAction } from "@/app/(auth)/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginFormProps {
  redirectUrl?: string
}

export function LoginForm({ redirectUrl }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <form action={formAction} className="space-y-4">
      {redirectUrl && <input type="hidden" name="redirect" value={redirectUrl} />}

      {state?.error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/70 p-3 text-xs text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <div className="leading-relaxed">{state.error}</div>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-[#1c1c1c]"
        >
          Work email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@company.com"
          disabled={isPending}
          className="h-10 rounded-md border-[#eceae4] bg-[#fcfbf8] text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-[#1c1c1c]"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[11px] font-medium text-[#5f5f5d] underline-offset-4 hover:text-[#1c1c1c] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            disabled={isPending}
            className="h-10 rounded-md border-[#eceae4] bg-[#fcfbf8] pr-10 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5f5f5d] transition-colors hover:text-[#1c1c1c]"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-10 rounded-md bg-[#1c1c1c] text-xs font-medium text-[#fcfbf8] shadow-[var(--shadow-button-inset)] transition-all hover:bg-[#2b2b2b] disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in to Annotly"
        )}
      </Button>
    </form>
  )
}
