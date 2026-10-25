"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, AlertCircle, Mail } from "lucide-react"
import { signupSchema, type SignupInput } from "@/lib/auth/validation"
import { useSignupMutation } from "@/lib/auth/queries"
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

export function SignupForm() {
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [confirmationNotice, setConfirmationNotice] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

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
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="font-heading text-sm font-semibold text-emerald-900">
          Check your email
        </h3>
        <p className="mt-1.5 text-xs text-emerald-800 leading-relaxed">
          {confirmationNotice}
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-medium">
                Full name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  disabled={isSubmitting}
                  className="h-11 rounded-lg border-[#eceae4] bg-white px-3.5 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-medium">
                Work email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="jane@agency.com"
                  disabled={isSubmitting}
                  className="h-11 rounded-lg border-[#eceae4] bg-white px-3.5 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-medium">
                Password
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    disabled={isSubmitting}
                    className="h-11 rounded-lg border-[#eceae4] bg-white pr-10 pl-3.5 text-xs text-[#1c1c1c] placeholder:text-[#5f5f5d]/60 focus-visible:ring-1 focus-visible:ring-[#1c1c1c]"
                  />
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-1">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-[6px] bg-[#1c1c1c] text-xs font-medium text-[#fcfbf8] shadow-[var(--shadow-button-inset)] transition-all hover:bg-[#2b2b2b] disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
