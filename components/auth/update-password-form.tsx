"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { updatePasswordSchema, type UpdatePasswordInput } from "@/lib/auth/validation"
import { updatePasswordAction } from "@/app/(auth)/actions"
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

export function UpdatePasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: UpdatePasswordInput) => {
    try {
      setIsSubmitting(true)
      setServerError(null)

      const formData = new FormData()
      formData.append("password", values.password)
      formData.append("confirmPassword", values.confirmPassword)

      const result = await updatePasswordAction(null, formData)
      if (result) {
        if (!result.success && result.error) {
          setServerError(result.error)
          setIsSubmitting(false)
        } else if (result.success) {
          setIsSuccess(true)
          setIsSubmitting(false)
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "NEXT_REDIRECT") {
        throw err
      }
      setIsSubmitting(false)
      setServerError("Unable to update password. Please try again.")
    }
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

        {isSuccess && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <div className="leading-relaxed">Password successfully updated!</div>
          </div>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-[#1c1c1c]">
                New password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    disabled={isSubmitting}
                    className="h-11 rounded-lg border-[#eceae4] bg-white pr-10 pl-3.5 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f5f5d] transition-colors hover:text-[#1c1c1c]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-[#1c1c1c]">
                Confirm new password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    disabled={isSubmitting}
                    className="h-11 rounded-lg border-[#eceae4] bg-white pr-10 pl-3.5 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f5f5d] transition-colors hover:text-[#1c1c1c]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
              Saving password...
            </>
          ) : (
            "Save new password"
          )}
        </Button>
      </form>
    </Form>
  )
}
