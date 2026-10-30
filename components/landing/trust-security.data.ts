import { Globe2, Lock, ShieldCheck, type LucideIcon } from "lucide-react"

export interface Assurance {
  icon: LucideIcon
  title: string
  badge: string
  description: string
}

export const ASSURANCES: Assurance[] = [
  {
    icon: ShieldCheck,
    title: "SSRF-Protected Reverse Proxy",
    badge: "Network Hardening",
    description:
      "When Annotly frames upstream websites, all requests pass through a dedicated Next.js proxy route handler with strict SSRF defense. DNS resolutions are validated against loopback addresses (127.0.0.1), RFC1918 private subnets, and cloud metadata IPs (169.254.169.254) to prevent internal network scanning.",
  },
  {
    icon: Lock,
    title: "Safe Framing & CSP Sanitization",
    badge: "Zero Clickjacking",
    description:
      "Modern websites enforce strict 'X-Frame-Options: DENY' and CSP 'frame-ancestors' headers. Annotly safely sanitizes framing headers within an isolated sandboxed origin while keeping native target site CSS, JavaScript, and asset security intact.",
  },
  {
    icon: Globe2,
    title: "Universal Platform Compatibility",
    badge: "Any Web Stack",
    description:
      "Annotly works out of the box with Next.js, Vercel preview URLs, Netlify branch deploys, Webflow sites, Shopify stores, WordPress, Astro, Vite, or static HTML. If it runs in a browser and has a reachable URL, your team can review it.",
  },
]
