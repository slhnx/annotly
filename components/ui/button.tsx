import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none select-none active:opacity-80 disabled:pointer-events-none disabled:opacity-50 focus-visible:shadow-[rgba(0,0,0,0.1)_0px_4px_12px] focus-visible:ring-2 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // DESIGN.md: Primary Dark with signature inset shadow and 6px radius
        default:
          "bg-primary text-primary-foreground rounded-[6px] shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] hover:bg-neutral-800 dark:hover:bg-neutral-200",
        // DESIGN.md: Ghost / Outline with rgba(28,28,28,0.4) border and 6px radius
        outline:
          "border border-[rgba(28,28,28,0.4)] dark:border-[rgba(236,234,228,0.3)] bg-transparent text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.04] rounded-[6px]",
        // DESIGN.md: Cream Surface for tertiary actions and toolbar buttons
        surface:
          "bg-background text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.04] rounded-[6px]",
        // DESIGN.md: Full-pill (9999px) action button with inset shadow
        pill:
          "bg-background text-foreground rounded-full border border-border shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] opacity-70 hover:opacity-100",
        // Secondary soft gray button
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-[6px]",
        // Ghost button
        ghost:
          "hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-foreground rounded-[6px]",
        // Destructive button
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[6px]",
        // Link with underline
        link: "text-foreground underline underline-offset-4 hover:opacity-80 p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-9 rounded-[6px]",
        "icon-sm": "size-7 rounded-[4px]",
        "icon-pill": "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
