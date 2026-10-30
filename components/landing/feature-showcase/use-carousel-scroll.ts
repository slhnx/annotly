import { useCallback, useEffect, useRef, useState } from "react"

const EDGE_TOLERANCE_PX = 15
const MOBILE_BREAKPOINT_PX = 640
const MOBILE_STEP_PX = 320
const DESKTOP_STEP_PX = 420

export function useCarouselScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > EDGE_TOLERANCE_PX)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - EDGE_TOLERANCE_PX)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [checkScroll])

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current
    if (!el) return
    const step = el.clientWidth < MOBILE_BREAKPOINT_PX ? MOBILE_STEP_PX : DESKTOP_STEP_PX
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    })
  }

  return { containerRef, canScrollLeft, canScrollRight, checkScroll, scroll }
}
