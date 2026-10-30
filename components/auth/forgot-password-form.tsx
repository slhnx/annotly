"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, MailCheck } from "lucide-react"
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/auth/validation"
import { useForgotPasswordMutation } from "@/lib/auth/queries"
import { Form } from "@/components/ui/form"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { AuthLink } from "@/components/auth/auth-link"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { AuthSuccessPanel } from "@/components/auth/auth-success"
import { AuthTextField } from "@/components/auth/auth-text-field"

export function ForgotPasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const forgotMutation = useForgotPasswordMutation()

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: ForgotPasswordInput) => {
    setServerError(null)

    forgotMutation.mutate(values, {
      onSuccess: (result) => {
        if (result) {
          if (!result.success && result.error) {
            setServerError(result.error)
          } else if (result.success) {
            setIsSuccess(true)
          }
        }
      },
      onError: () => {
        setServerError("Unable to send reset instructions. Please try again.")
      },
    })
  }

  const isSubmitting = forgotMutation.isPending

  if (isSuccess) {
    return (
      <div className="space-y-5">
        <AuthSuccessPanel icon={MailCheck} title="Reset email sent">
          If an account exists for {form.getValues("email")}, we&apos;ve sent a
          password reset link. Please check your inbox and spam folder.
        </AuthSuccessPanel>

        <div className="flex justify-center">
          <AuthLink href="/login" className="gap-1.5 font-medium">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Back to sign in</span>
          </AuthLink>
        </div>
      </div>
    )
  }

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

        <div className="pt-1">
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingLabel="Sending instructions..."
          >
            Send reset instructions
          </AuthSubmitButton>
        </div>
      </form>
    </Form>
  )
}
