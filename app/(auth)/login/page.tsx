import type { Metadata } from "next"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign In | Annotly",
  description: "Sign in to your Annotly account to manage your review canvases and feedback.",
}

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams

  return (
    <AuthCard
      title="Welcome back"
      description="Enter your credentials to access your review projects."
      footer={
        <span>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Create an account
          </Link>
        </span>
      }
    >
      <LoginForm redirectUrl={resolvedSearchParams?.redirect} />
    </AuthCard>
  )
}
