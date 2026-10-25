"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
} from "@/lib/auth/validation"

export type AuthActionResult = {
  success: boolean
  error?: string
  message?: string
  requiresConfirmation?: boolean
}

export async function loginAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = loginSchema.safeParse(rawData)
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input"
    return { success: false, error: errorMsg }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { success: false, error: "Incorrect email or password. Please try again." }
    }
    if (error.message.includes("Email not confirmed")) {
      return {
        success: false,
        error: "Your email is not verified yet. Please check your inbox for the confirmation link.",
      }
    }
    return { success: false, error: error.message }
  }

  const redirectTo = (formData.get("redirect") as string) || "/dashboard"
  redirect(redirectTo)
}

export async function signupAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = signupSchema.safeParse(rawData)
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input"
    return { success: false, error: errorMsg }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
    },
  })

  if (error) {
    if (error.message.includes("already registered")) {
      return {
        success: false,
        error: "An account with this email already exists. Try logging in instead.",
      }
    }
    return { success: false, error: error.message }
  }

  // If user session is created immediately (email confirmation disabled in Supabase)
  if (data.session) {
    redirect("/dashboard")
  }

  // If Supabase requires email verification
  return {
    success: true,
    requiresConfirmation: true,
    message: `A confirmation link has been sent to ${parsed.data.email}. Please verify your email to continue.`,
  }
}

export async function forgotPasswordAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
  }

  const parsed = forgotPasswordSchema.safeParse(rawData)
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid email"
    return { success: false, error: errorMsg }
  }

  const supabase = await createClient()
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/update-password`

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return {
    success: true,
    message: "If an account exists with this email, we have sent password reset instructions.",
  }
}

export async function updatePasswordAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  const parsed = updatePasswordSchema.safeParse(rawData)
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid password"
    return { success: false, error: errorMsg }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  redirect("/dashboard")
}

export async function signoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
