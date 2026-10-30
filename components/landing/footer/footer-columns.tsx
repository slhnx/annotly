import { CONTACT_EMAIL, SOCIAL_LINKS } from "./footer.data"
import { FooterEmailCopy } from "./footer-email-copy"
import { FooterNewsletter } from "./footer-newsletter"

const COLUMN_LABEL_CLASS =
  "mb-2 font-mono text-xs font-semibold tracking-wider text-inverse-foreground/60 uppercase"

export function FooterColumns() {
  return (
    <div className="relative z-10 grid grid-cols-1 items-start gap-10 md:grid-cols-12 lg:gap-14 xl:gap-20">
      <div className="space-y-3 md:col-span-5">
        <h2 className="font-heading text-3xl leading-tight font-semibold tracking-[-1.2px] text-inverse-foreground sm:text-4xl lg:text-5xl">
          Let&apos;s talk
        </h2>
        <div className="pt-1">
          <FooterEmailCopy />
        </div>
        <p className="max-w-sm pt-2 text-xs leading-relaxed text-inverse-foreground/60 sm:max-w-md sm:text-sm">
          Have questions about custom agency deployments, reverse proxy hardening, or integrations? We&apos;d love to chat.
        </p>
      </div>

      <div className="space-y-8 md:col-span-3">
        <div>
          <div className={COLUMN_LABEL_CLASS}>Contact</div>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="text-inverse-foreground/60">Global Enquiries</div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-inverse-foreground underline-offset-4 transition-colors hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div>
          <div className={COLUMN_LABEL_CLASS}>Follow</div>
          <ul className="space-y-1.5 text-xs sm:text-sm">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-inverse-foreground/80 transition-colors hover:text-inverse-foreground"
                >
                  <span className="text-xs opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3 md:col-span-4">
        <div className={COLUMN_LABEL_CLASS}>Newsletter</div>
        <p className="max-w-sm text-xs leading-relaxed text-inverse-foreground/70 sm:max-w-md sm:text-sm">
          Sign up for our newsletter about designing visual review loops that keep teams moving.
        </p>
        <FooterNewsletter />
      </div>
    </div>
  )
}
