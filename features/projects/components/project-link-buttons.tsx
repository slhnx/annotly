"use client"

import Link from "next/link"
import { Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useCopyReviewLink } from "../hooks/use-copy-review-link"

interface ShareLinkButtonProps {
  reviewUrl: string
  /** Label shown in the idle state. */
  label: string
  className?: string
  labelClassName?: string
}

export function ShareLinkButton({
  reviewUrl,
  label,
  className,
  labelClassName,
}: ShareLinkButtonProps) {
  const { copied, copy } = useCopyReviewLink(reviewUrl)

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={copy}

      className={className}
    >
      {copied ? (
        <>
          <Check className="size-3 text-success" />
          <span className="text-success">Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3 text-muted-foreground" />
          <span className={labelClassName}>{label}</span>
        </>
      )}
    </Button>
  )
}

interface OpenCanvasButtonProps {
  reviewUrl: string
  label?: string
  variant?: "default" | "outline"
  className?: string
}

export function OpenCanvasButton({
  reviewUrl,
  label = "Canvas",
  variant = "default",
  className,
}: OpenCanvasButtonProps) {
  return (
    <Button
      size="sm"
      variant={variant}
      nativeButton={false}
      className={className}
      render={<Link href={reviewUrl} target="_blank" />}
    >
      <span>{label}</span>
      <ExternalLink className="size-3" />
    </Button>
  )
}
