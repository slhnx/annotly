"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePasswordSchema, type UpdatePasswordInput } from "@/lib/auth/validation"
import { useUpdatePasswordMutation } from "@/lib/auth/queries"
import { Form } from "@/components/ui/form"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { AuthSuccessAlert } from "@/components/auth/auth-success"
import { AuthTextField } from "@/components/auth/auth-text-field"

export function UpdatePasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const updateMutation = useUpdatePasswordMutation()

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: UpdatePasswordInput) => {
    setServerError(null)

    updateMutation.mutate(values, {
      onSuccess: (result) => {
        if (result) {
          if (!result.success && result.error) {
            setServerError(result.error)
          } else if (result.success) {
            setIsSuccess(true)
          }
        }
      },
      onError: (err: unknown) => {
        if (err instanceof Error && err.message === "NEXT_REDIRECT") {
          return
        }
        setServerError("Unable to update password. Please try again.")
      },
    })
  }

  const isSubmitting = updateMutation.isPending

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {serverError && <AuthErrorAlert>{serverError}</AuthErrorAlert>}

        {isSuccess && (
          <AuthSuccessAlert>Password successfully updated!</AuthSuccessAlert>
        )}

        <AuthTextField
          control={form.control}
          name="password"
          label="New password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          disabled={isSubmitting}
        />

        <AuthTextField
          control={form.control}
          name="confirmPassword"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          disabled={isSubmitting}
        />

        <div className="pt-1">
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingLabel="Saving password..."
          >
            Save new password
          </AuthSubmitButton>
        </div>
      </form>
    </Form>
  )
}
