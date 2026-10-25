"use client"

import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  loginAction,
  signupAction,
  forgotPasswordAction,
  updatePasswordAction,
  signoutAction,
  type AuthActionResult,
} from "@/app/(auth)/actions"
import { createClient } from "@/lib/supabase/client"
import type {
  LoginInput,
  SignupInput,
  ForgotPasswordInput,
  UpdatePasswordInput,
} from "@/lib/auth/validation"

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  session: () => [...authKeys.all, "session"] as const,
}

/**
 * Fetch the currently authenticated Supabase user.
 */
export function useCurrentUser() {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(authKeys.user(), session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient])

  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        return null
      }
      return data.user
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

/**
 * React Query mutation for user login.
 */
export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation<AuthActionResult, Error, { values: LoginInput; redirectUrl?: string }>({
    mutationFn: async ({ values, redirectUrl }) => {
      const formData = new FormData()
      formData.append("email", values.email)
      formData.append("password", values.password)
      if (redirectUrl) {
        formData.append("redirect", redirectUrl)
      }
      return await loginAction(null, formData)
    },
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: authKeys.all })
      }
    },
  })
}

/**
 * React Query mutation for user account creation.
 */
export function useSignupMutation() {
  const queryClient = useQueryClient()

  return useMutation<AuthActionResult, Error, SignupInput>({
    mutationFn: async (values) => {
      const formData = new FormData()
      formData.append("fullName", values.fullName)
      formData.append("email", values.email)
      formData.append("password", values.password)
      return await signupAction(null, formData)
    },
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: authKeys.all })
      }
    },
  })
}

/**
 * React Query mutation for password recovery request.
 */
export function useForgotPasswordMutation() {
  return useMutation<AuthActionResult, Error, ForgotPasswordInput>({
    mutationFn: async (values) => {
      const formData = new FormData()
      formData.append("email", values.email)
      return await forgotPasswordAction(null, formData)
    },
  })
}

/**
 * React Query mutation for setting a new password.
 */
export function useUpdatePasswordMutation() {
  const queryClient = useQueryClient()

  return useMutation<AuthActionResult, Error, UpdatePasswordInput>({
    mutationFn: async (values) => {
      const formData = new FormData()
      formData.append("password", values.password)
      formData.append("confirmPassword", values.confirmPassword)
      return await updatePasswordAction(null, formData)
    },
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: authKeys.all })
      }
    },
  })
}

/**
 * React Query mutation for GitHub OAuth flow.
 */
export function useGithubSignInMutation() {
  return useMutation<{ url?: string }, Error, { redirectUrl?: string }>({
    mutationFn: async ({ redirectUrl = "/dashboard" }) => {
      const supabase = createClient()
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(redirectUrl)}`

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
        },
      })
      if (error) throw error
      if (data?.url && typeof window !== "undefined") {
        window.location.assign(data.url)
      }
      return data
    },
  })
}

/**
 * React Query mutation for signing out.
 */
export function useSignoutMutation() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await signoutAction()
    },
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null)
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}
