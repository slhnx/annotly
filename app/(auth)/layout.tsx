import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | Annotly",
  description: "Sign in or create an account on Annotly — visual website feedback and collaboration.",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#f7f4ed] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-[#f7f4ed]">
      {/* Subtle background ambient warmth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(28, 28, 28, 0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Main Centered Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 md:py-16">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-[#5f5f5d]">
        <div className="flex items-center justify-center gap-4">
          <span>&copy; {new Date().getFullYear()} Annotly Inc.</span>
          <span>&middot;</span>
          <span className="hover:text-[#1c1c1c] transition-colors cursor-pointer">
            Privacy Policy
          </span>
          <span>&middot;</span>
          <span className="hover:text-[#1c1c1c] transition-colors cursor-pointer">
            Terms of Service
          </span>
        </div>
      </footer>
    </div>
  )
}
