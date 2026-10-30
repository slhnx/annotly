import { useEffect, useRef, useState } from "react"

const STEP_DURATION = 4000 // 4 seconds per step
const TICK_INTERVAL = 40 // 40ms updates for smooth 60fps-like progress

/**
 * Drives an auto-advancing, hover-pausable stepped demo (progress bar + step index).
 * Shared by the landing page's animated demo sections.
 */
export function useStepPlayer(stepCount: number) {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const progressRef = useRef(0)

  useEffect(() => {
    if (!isPlaying || isHovered || isCompleted) return

    // Anchor start time to accumulated progress so hover-resume continues where it paused.
    const startTime = Date.now() - (progressRef.current / 100) * STEP_DURATION

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / STEP_DURATION) * 100, 100)

      if (currentProgress >= 100) {
        clearInterval(timer)
        progressRef.current = 0
        if (activeStep < stepCount - 1) {
          setActiveStep((prev) => prev + 1)
          setProgress(0)
        } else {
          progressRef.current = 100
          setProgress(100)
          setIsCompleted(true)
          setIsPlaying(false)
        }
      } else {
        progressRef.current = currentProgress
        setProgress(currentProgress)
      }
    }, TICK_INTERVAL)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isCompleted, activeStep, stepCount])

  const selectStep = (idx: number) => {
    progressRef.current = 0
    setActiveStep(idx)
    setProgress(0)
    setIsCompleted(false)
    setIsPlaying(true)
  }

  const replay = () => selectStep(0)

  const nextStep = () => {
    if (activeStep < stepCount - 1) {
      selectStep(activeStep + 1)
    } else {
      replay()
    }
  }

  const togglePlaying = () => setIsPlaying((playing) => !playing)

  return {
    activeStep,
    progress,
    isPlaying,
    isCompleted,
    isHovered,
    setIsHovered,
    selectStep,
    replay,
    nextStep,
    togglePlaying,
  }
}

export type StepPlayer = ReturnType<typeof useStepPlayer>
