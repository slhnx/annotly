"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/auth/validation"
import { useLoginMutation } from "@/lib/auth/queries"
import { Form } from "@/components/ui/form"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { AuthTextField } from "@/components/auth/auth-text-field"

interface LoginFormProps {
  redirectUrl?: string
}

export function LoginForm({ redirectUrl }: LoginFormProps) {
  const [serverError, setServerError] = React.useState<string | null>(null)

  const loginMutation = useLoginMutation()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: LoginInput) => {
    setServerError(null)
    loginMutation.mutate(
      { values, redirectUrl },
      {
        onSuccess: (result) => {
          if (result && !result.success && result.error) {
            setServerError(result.error)
          }
        },
        onError: (err: unknown) => {
          if (err instanceof Error && err.message === "NEXT_REDIRECT") {
            return
          }
          setServerError("An unexpected error occurred. Please try again.")
        },
      }
    )
  }

  const isSubmitting = loginMutation.isPending

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {serverError && <AuthErrorAlert>{serverError}</AuthErrorAlert>}

        <AuthTextField
          control={form.control}
          name="email"
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          disabled={isSubmitting}
        />

        <AuthTextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          disabled={isSubmitting}
          labelAction={
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        <div className="pt-1">
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingLabel="Signing in..."
          >
            Continue with email
          </AuthSubmitButton>
        </div>
      </form>
    </Form>
  )
}
