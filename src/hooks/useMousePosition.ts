import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

/**
 * Hook to track mouse position
 * Throttled to ~60fps for performance
 * Returns { x, y } coordinates relative to viewport
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let frameId: number | null = null
    let lastX = 0
    let lastY = 0

    // Throttle to requestAnimationFrame (~60fps)
    const updateMousePosition = () => {
      setMousePosition({ x: lastX, y: lastY })
      frameId = null
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastX = event.clientX
      lastY = event.clientY

      // Only update if not already scheduled
      if (frameId === null) {
        frameId = requestAnimationFrame(updateMousePosition)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return mousePosition
}
