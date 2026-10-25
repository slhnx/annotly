import type { Metadata } from "next"
import { Inter, Geist_Mono, Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import "@/lib/env"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryProvider } from "@/components/providers/query-provider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Annotly — Website Feedback Without the Back-and-Forth",
  description:
    "Pin comments directly on any webpage, keep every suggestion in technical context, and help your team turn client feedback into clearer next steps. Zero extensions, zero client passwords.",
  metadataBase: new URL("https://annotly.xyz"),
  openGraph: {
    title: "Annotly — Website Feedback Without the Back-and-Forth",
    description:
      "Pin comments directly on any webpage, keep every suggestion in technical context, and help your team turn client feedback into clearer next steps.",
    url: "https://annotly.xyz",
    siteName: "Annotly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Annotly — Website Feedback Without the Back-and-Forth",
    description:
      "Pin comments directly on any live webpage, keep every suggestion in technical context, and resolve feedback without extensions.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        inter.variable,
        fontHeading.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen bg-background text-foreground">
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
