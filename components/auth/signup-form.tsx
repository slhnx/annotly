"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { signupSchema, type SignupInput } from "@/lib/auth/validation"
import { useSignupMutation } from "@/lib/auth/queries"
import { Form } from "@/components/ui/form"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { AuthSuccessPanel } from "@/components/auth/auth-success"
import { AuthTextField } from "@/components/auth/auth-text-field"

export function SignupForm() {
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [confirmationNotice, setConfirmationNotice] = React.useState<string | null>(null)

  const signupMutation = useSignupMutation()

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: SignupInput) => {
    setServerError(null)
    setConfirmationNotice(null)

    signupMutation.mutate(values, {
      onSuccess: (result) => {
        if (result) {
          if (!result.success && result.error) {
            setServerError(result.error)
          } else if (result.success && result.requiresConfirmation && result.message) {
            setConfirmationNotice(result.message)
          }
        }
      },
      onError: (err: unknown) => {
        if (err instanceof Error && err.message === "NEXT_REDIRECT") {
          return
        }
        setServerError("An unexpected error occurred during signup. Please try again.")
      },
    })
  }

  const isSubmitting = signupMutation.isPending

  if (confirmationNotice) {
    return (
      <AuthSuccessPanel icon={Mail} title="Check your email">
        {confirmationNotice}
      </AuthSuccessPanel>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {serverError && <AuthErrorAlert>{serverError}</AuthErrorAlert>}

        <AuthTextField
          control={form.control}
          name="fullName"
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          disabled={isSubmitting}
        />

        <AuthTextField
          control={form.control}
          name="email"
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="jane@agency.com"
          disabled={isSubmitting}
        />

        <AuthTextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          disabled={isSubmitting}
        />

        <div className="pt-1">
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingLabel="Creating account..."
          >
            Create account
          </AuthSubmitButton>
        </div>
      </form>
    </Form>
  )
}
