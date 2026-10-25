"use client"

import * as React from "react"
import Link from "next/link"
import { useActionState } from "react"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Mail } from "lucide-react"
import { signupAction } from "@/app/(auth)/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupAction, null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState("")

  if (state?.requiresConfirmation) {
    return (
      <div className="flex flex-col items-center text-center py-3 space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c1c1c]/5 text-[#1c1c1c]">
          <Mail className="h-6 w-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="font-heading text-lg font-bold text-[#1c1c1c]">
            Check your email
          </h2>
          <p className="text-xs text-[#5f5f5d] leading-relaxed max-w-[280px]">
            {state.message}
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
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
          htmlFor="fullName"
          className="block text-xs font-medium text-[#1c1c1c]"
        >
          Full name
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder="Jane Doe"
          disabled={isPending}
          className="h-10 rounded-md border-[#eceae4] bg-[#fcfbf8] text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
        />
      </div>

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
          placeholder="jane@agency.com"
          disabled={isPending}
          className="h-10 rounded-md border-[#eceae4] bg-[#fcfbf8] text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs font-medium text-[#1c1c1c]"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
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

        {/* Live password requirement indicator */}
        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#5f5f5d]">
          <CheckCircle2
            className={`h-3 w-3 ${password.length >= 8 ? "text-emerald-600" : "text-[#eceae4]"}`}
          />
          <span className={password.length >= 8 ? "text-emerald-700 font-medium" : ""}>
            Must be at least 8 characters
          </span>
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
            Creating account...
          </>
        ) : (
          "Create free account"
        )}
      </Button>

      <p className="text-center text-[11px] text-[#5f5f5d]/80 leading-normal">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
