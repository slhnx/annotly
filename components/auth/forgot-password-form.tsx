"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, AlertCircle, ArrowLeft, MailCheck } from "lucide-react"
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/auth/validation"
import { forgotPasswordAction } from "@/app/(auth)/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function ForgotPasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordInput) => {
    try {
      setIsSubmitting(true)
      setServerError(null)

      const formData = new FormData()
      formData.append("email", values.email)

      const result = await forgotPasswordAction(null, formData)
      if (result) {
        if (!result.success && result.error) {
          setServerError(result.error)
          setIsSubmitting(false)
        } else if (result.success) {
          setIsSuccess(true)
          setIsSubmitting(false)
        }
      }
    } catch {
      setIsSubmitting(false)
      setServerError("Unable to send reset instructions. Please try again.")
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <MailCheck className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-emerald-950">
            Reset email sent
          </h3>
          <p className="mt-1.5 text-xs text-emerald-800 leading-relaxed">
            If an account exists for {form.getValues("email")}, we&apos;ve sent
            a password reset link. Please check your inbox and spam folder.
          </p>
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to sign in</span>
        </Link>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/70 p-3 text-xs text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <div className="leading-relaxed">{serverError}</div>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-[#1c1c1c]">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  disabled={isSubmitting}
                  className="h-11 rounded-lg border-[#eceae4] bg-white px-3.5 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-full bg-[#1c1c1c] text-xs font-medium text-[#fcfbf8] shadow-[var(--shadow-button-inset)] transition-all hover:bg-[#2b2b2b] disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending instructions...
            </>
          ) : (
            "Send reset instructions"
          )}
        </Button>
      </form>
    </Form>
  )
}
