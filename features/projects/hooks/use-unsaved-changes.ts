"use client"

import * as React from "react"

export interface UseUnsavedChangesOptions<T> {
  initialValues: T
  currentValues: T
  isEqual?: (a: T, b: T) => boolean
}

export function useUnsavedChanges<T>({
  initialValues,
  currentValues,
  isEqual,
}: UseUnsavedChangesOptions<T>) {
  const isDirty = React.useMemo(() => {
    if (isEqual) return !isEqual(initialValues, currentValues)
    return JSON.stringify(initialValues) !== JSON.stringify(currentValues)
  }, [initialValues, currentValues, isEqual])

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isDirty])

  return { isDirty }
}
