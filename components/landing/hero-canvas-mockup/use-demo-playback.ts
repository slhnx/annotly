"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  DEMO_STEPS,
  REPLAY_SPIN_MS,
  STEP_DURATION_MS,
  TICK_INTERVAL_MS,
} from "./hero-canvas-mockup.data"

export type CursorPhase = "moving" | "clicking" | "clicked"

export function useDemoPlayback() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isReplaying, setIsReplaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0 to 100%

  const progressRef = useRef(0)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      progressRef.current += (TICK_INTERVAL_MS / STEP_DURATION_MS) * 100

      if (progressRef.current >= 100) {
        progressRef.current = 0
        setCurrentStep((prev) => (prev + 1) % DEMO_STEPS.length)
      }

      setProgress(Math.min(progressRef.current, 100))
    }, TICK_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [isPlaying])

  const resetProgress = useCallback(() => {
    progressRef.current = 0
    setProgress(0)
  }, [])

  const selectStep = useCallback(
    (stepIndex: number) => {
      setCurrentStep(stepIndex)
      resetProgress()
    },
    [resetProgress]
  )

  const replay = useCallback(() => {
    setIsReplaying(true)
    setCurrentStep(0)
    resetProgress()
    setIsPlaying(true)
    setTimeout(() => setIsReplaying(false), REPLAY_SPIN_MS)
  }, [resetProgress])

  // Derived from progress during step 0 so no extra state or effects are needed.
  const cursorPhase: CursorPhase =
    currentStep !== 0
      ? "clicked"
      : progress < 22
        ? "moving"
        : progress < 32
          ? "clicking"
          : "clicked"

  return {
    currentStep,
    isPlaying,
    isReplaying,
    progress,
    cursorPhase,
    setIsPlaying,
    selectStep,
    replay,
  }
}
