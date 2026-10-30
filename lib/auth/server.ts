import { cache } from "react"
import { redirect } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

export interface UserProfile {
  id: string
  email?: string | null
  name?: string | null
  avatarUrl?: string | null
}

/**
 * Retrieves the currently authenticated Supabase user for the request.
 * Wrapped in React cache() so multiple calls in layout, page, and nested components
 * deduplicate into a single network call per HTTP request.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch {
    return null
  }
})

/**
 * Server Component guard: returns the authenticated user or redirects to /login.
 */
export async function requireUser(redirectTo = "/login"): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect(redirectTo)
  }
  return user
}

/**
 * Server Action guard: returns the authenticated user or throws an Unauthorized error.
 */
export async function requireAuthAction(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized: Please sign in to perform this action.")
  }
  return user
}

/**
 * Helper to normalize a Supabase User object into a UI-friendly UserProfile.
 */
export function formatUserProfile(user: User): UserProfile {
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reviewer",
    avatarUrl: user.user_metadata?.avatar_url || null,
  }
}
