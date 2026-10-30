export interface FaqItemData {
  q: string
  a: string
}

export const FAQS: FaqItemData[] = [
  {
    q: "What is Annotly and how does zero-install visual review work?",
    a: "Traditional feedback loops force reviewers to take screenshots, draw red arrows, and paste them into fragmented Slack threads or emails. Annotly lets you paste any live website URL to generate an interactive review canvas with shareable links. Reviewers click directly on live webpage elements to leave anchored pins with automatic technical context (viewport, browser, OS, and timestamp). Clients and external stakeholders do not need to install browser extensions or create accounts.",
  },
  {
    q: "How do pins stay aligned when the browser window resizes or text reflows?",
    a: "Annotly does not rely on fragile absolute pixel coordinates. When a reviewer clicks an element, the Annotly bridge calculates element-relative percentage offsets (OffsetX = (clickX - rect.left) / rect.width * 100) and captures 5-tier resilient CSS selectors. Even when responsive layout columns stack or fonts reflow, the pin remains precisely anchored to the element across viewports.",
  },
  {
    q: "Do clients or guest reviewers need passwords or browser extensions?",
    a: "No! External clients and reviewers never need to download Chrome extensions or create passwords. They simply open your shareable review link, enter their name or email, and start clicking anywhere on the page to leave feedback immediately. Frictionless guest commenting reduces review turnaround from days to minutes.",
  },
  {
    q: "How does Annotly handle websites with strict framing or CSP restrictions?",
    a: "Target websites frequently enforce 'X-Frame-Options: DENY' and Content-Security-Policy 'frame-ancestors'. Annotly handles upstream requests through a dedicated Next.js reverse proxy route with built-in SSRF protection, safely stripping clickjacking headers while injecting the client review bridge script.",
  },
  {
    q: "Does Annotly capture screenshots automatically with each comment?",
    a: "Yes. At the exact millisecond a pin is placed, Annotly rasterizes a fast in-browser client-side HTML5 canvas snapshot of the element and surrounding viewport. Developers can see both the live interactive pin on the current page and the visual snapshot recorded at the time of comment creation.",
  },
  {
    q: "Can I use Annotly with staging environments, Vercel previews, or Webflow sites?",
    a: "Yes. Annotly works seamlessly with public URLs, Vercel and Netlify preview deployments, Webflow staging links, Shopify stores, and staging environments behind HTTP basic authentication.",
  },
  {
    q: "How does team collaboration and resolving comments work?",
    a: "Each review canvas has threaded commenting, image attachments, and 1-click status toggles ('In Review', 'Resolved'). Once code updates are deployed, developers mark the pin resolved and clients receive instant visual confirmation on the live canvas.",
  },
  {
    q: "What is included in the 14-day free trial?",
    a: "The 14-day free trial gives you full access to unlimited review projects, guest reviewer access, DOM-anchored pins, and automatic technical diagnostics. No credit card is required to get started.",
  },
]
