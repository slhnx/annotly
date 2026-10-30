export const CONTACT_EMAIL = "hello@annotly.xyz"

export interface SocialLink {
  label: string
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
]

export interface LegalLink {
  label: string
  href: string
}

export const LEGAL_LINKS: LegalLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/security" },
]
