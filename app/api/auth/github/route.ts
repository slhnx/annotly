import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

function getOrigin(request: Request): string {
  const requestUrl = new URL(request.url)
  const forwardedHost = request.headers.get("x-forwarded-host")
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https"

  if (process.env.NODE_ENV === "development") {
    return requestUrl.origin
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }

  return requestUrl.origin
}

/**
 * GET /api/auth/github
 * Initiates the GitHub OAuth flow on the server and redirects the browser directly to GitHub.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = getOrigin(request)
  const next = searchParams.get("next") || searchParams.get("redirect") || "/dashboard"

  const supabase = await createClient()
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  })

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    )
  }

  if (data?.url) {
    return NextResponse.redirect(data.url)
  }

  return NextResponse.redirect(
    `${origin}/login?error=Failed+to+initiate+GitHub+authentication`
  )
}

/**
 * POST /api/auth/github
 * Returns the OAuth URL for client-side programmatic navigation.
 */
export async function POST(request: Request) {
  const origin = getOrigin(request)
  let next = "/dashboard"

  try {
    const body = await request.json()
    if (body?.redirectUrl) {
      next = body.redirectUrl
    }
  } catch {
    // ignore empty body
  }

  const supabase = await createClient()
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ url: data.url })
}
