import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SteamEffectProps {
  /** Number of steam particles (default: 20) */
  count?: number
  /** Starting position (bottom percentage) */
  startY?: string
  /** Color of steam particles (default: amber with low opacity) */
  color?: string
  /** Maximum height particles can travel */
  height?: number
  /** Container class name */
  className?: string
}

export default function SteamEffect({
  count = 20,
  startY = '40%',
  color = 'var(--color-brand-amber)',
  height = 200,
  className = '',
}: SteamEffectProps) {
  const prefersReducedMotion = useReducedMotion()

  const particles = Array.from({ length: count }, (_, i) => {
    // Deterministic randomness for SSR consistency
    const seed = i * 13.7
    const random = (min: number, max: number, offset = 0) => {
      const r = Math.sin(seed + offset) * 10000
      return min + ((r - Math.floor(r)) * (max - min))
    }

    return {
      id: i,
      x: random(25, 75), // Spread across center area
      size: random(2, 6), // 2-6px
      opacity: random(0.08, 0.25), // Very subtle
      duration: random(4, 7), // 4-7 seconds
      delay: random(0, 6), // Staggered start
      drift: random(-15, 15), // Horizontal drift
      blur: random(2, 5), // Blur amount
    }
  })

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: startY,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            filter: `blur(${p.blur}px)`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -height * 0.6, -height],
            x: [0, p.drift * 0.5, p.drift],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
