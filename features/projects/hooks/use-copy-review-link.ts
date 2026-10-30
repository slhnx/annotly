"use client"

import * as React from "react"

const COPIED_RESET_MS = 2000

export function useCopyReviewLink(reviewUrl: string) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${reviewUrl}`)
    } catch {
      return
    }
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS)
  }, [reviewUrl])

  return { copied, copy }
}
