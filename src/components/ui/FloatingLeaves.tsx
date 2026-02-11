import { motion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface FloatingLeavesProps {
  count?: number
  className?: string
}

interface LeafSVGProps {
  size?: number
  opacity?: number
  color?: string
}

function LeafSVG({ size = 16, opacity = 0.15, color = 'currentColor' }: LeafSVGProps) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 20 32"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M10 0C10 0 0 10 0 20C0 26 4 32 10 32C16 32 20 26 20 20C20 10 10 0 10 0Z"
        fill={color}
      />
      <path
        d="M10 6V28"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M10 14L5 10M10 18L6 15M10 22L7 20M10 14L15 10M10 18L14 15M10 22L13 20"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.3"
      />
    </svg>
  )
}

export default function FloatingLeaves({ count = 14, className = '' }: FloatingLeavesProps) {
  const mousePosition = useMousePosition()
  const prefersReducedMotion = useReducedMotion()

  // Color mix: 60% amber, 30% green, 10% brown
  const getLeafColor = (index: number): string => {
    const rand = (index * 17) % 100 // Deterministic randomness based on index
    if (rand < 60) return 'var(--color-brand-amber)'
    if (rand < 90) return 'var(--color-brand-green)'
    return 'var(--color-brand-dark-brown)'
  }

  const leaves = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${10 + Math.random() * 80}%`,
    y: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 12, // 8-20px range
    opacity: 0.08 + Math.random() * 0.04, // 0.08-0.12 range
    duration: 18 + Math.random() * 17, // 18-35 seconds
    delay: Math.random() * 15,
    rotate: Math.random() * 360,
    driftX: -40 + Math.random() * 80,
    driftY: -30 + Math.random() * 60,
    color: getLeafColor(i),
    // 3D rotation ranges
    rotateXRange: -15 + Math.random() * 30,
    rotateYRange: -15 + Math.random() * 30,
    // Wind gust timing (every 20s approximately)
    gustDelay: i * 3 + Math.random() * 5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {leaves.map((leaf) => {
        // Mouse parallax effect - only if within 200px radius
        const parallaxX = useSpring(0, { stiffness: 50, damping: 10 })
        const parallaxY = useSpring(0, { stiffness: 50, damping: 10 })

        // Update parallax based on mouse position
        useEffect(() => {
          if (prefersReducedMotion) return

          const updateParallax = () => {
            // Calculate leaf position in viewport
            const leafElement = document.getElementById(`leaf-${leaf.id}`)
            if (!leafElement) return

            const rect = leafElement.getBoundingClientRect()
            const leafCenterX = rect.left + rect.width / 2
            const leafCenterY = rect.top + rect.height / 2

            const dx = mousePosition.x - leafCenterX
            const dy = mousePosition.y - leafCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Apply parallax only within 200px radius
            if (distance < 200) {
              const influence = (200 - distance) / 200
              parallaxX.set(dx * influence * 0.05) // ±10px max
              parallaxY.set(dy * influence * 0.05)
            } else {
              parallaxX.set(0)
              parallaxY.set(0)
            }
          }

          updateParallax()
        }, [mousePosition, parallaxX, parallaxY, leaf.id, prefersReducedMotion])

        return (
          <motion.div
            key={leaf.id}
            id={`leaf-${leaf.id}`}
            className="absolute"
            style={{
              left: leaf.x,
              top: leaf.y,
              color: leaf.color,
              willChange: 'transform',
              x: parallaxX,
              y: parallaxY,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [0, leaf.driftX, -leaf.driftX / 2, 0],
                    y: [0, leaf.driftY, -leaf.driftY, 0],
                    rotate: [
                      leaf.rotate,
                      leaf.rotate + 25,
                      leaf.rotate - 15,
                      leaf.rotate,
                    ],
                    rotateX: [0, leaf.rotateXRange, -leaf.rotateXRange / 2, 0],
                    rotateY: [0, leaf.rotateYRange, -leaf.rotateYRange / 2, 0],
                  }
            }
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: leaf.delay,
              type: 'spring',
              stiffness: 50,
              damping: 10,
            }}
          >
            {/* Wind gust animation layer */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      x: [0, 15, 0],
                      scale: [1, 1.1, 1],
                    }
              }
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 20,
                delay: leaf.gustDelay,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <LeafSVG size={leaf.size} opacity={leaf.opacity} color={leaf.color} />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
