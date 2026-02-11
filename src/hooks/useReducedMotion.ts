import { useState, useEffect } from 'react'

/**
 * Hook to detect user's motion preference
 * Returns true if user prefers reduced motion (for accessibility)
 * All decorative animations should respect this preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if browser supports matchMedia
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(listener)
      return () => mediaQuery.removeListener(listener)
    }
  }, [])

  return prefersReducedMotion
}
