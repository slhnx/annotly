"use client"

import * as React from "react"
import Link from "next/link"
import { useActionState } from "react"
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import { forgotPasswordAction } from "@/app/(auth)/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, null)

  if (state?.success) {
    return (
      <div className="flex flex-col items-center text-center py-3 space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="font-heading text-lg font-bold text-[#1c1c1c]">
            Instructions sent
          </h2>
          <p className="text-xs text-[#5f5f5d] leading-relaxed max-w-[280px]">
            {state.message}
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
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

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-10 rounded-md bg-[#1c1c1c] text-xs font-medium text-[#fcfbf8] shadow-[var(--shadow-button-inset)] transition-all hover:bg-[#2b2b2b] disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            Sending link...
          </>
        ) : (
          "Send reset instructions"
        )}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#5f5f5d] hover:text-[#1c1c1c] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </form>
  )
}
