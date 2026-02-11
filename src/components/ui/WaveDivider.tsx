import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface WaveDividerProps {
  position?: 'top' | 'bottom'
  color?: string
  className?: string
}

export default function WaveDivider({
  position = 'bottom',
  color = 'var(--color-brand-offwhite)',
  className = '',
}: WaveDividerProps) {
  const flip = position === 'top' ? 'rotate-180' : ''
  const prefersReducedMotion = useReducedMotion()

  // Define wave paths for animation (3 layers with slight variations)
  const wavePaths = {
    wave1: [
      'M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z',
      'M0 40C240 70 480 10 720 40C960 70 1200 10 1440 40V80H0V40Z',
      'M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z',
    ],
    wave2: [
      'M0 45C240 15 480 65 720 45C960 15 1200 65 1440 45V80H0V45Z',
      'M0 45C240 65 480 15 720 45C960 65 1200 15 1440 45V80H0V45Z',
      'M0 45C240 15 480 65 720 45C960 15 1200 65 1440 45V80H0V45Z',
    ],
    wave3: [
      'M0 50C240 20 480 60 720 50C960 20 1200 60 1440 50V80H0V50Z',
      'M0 50C240 60 480 20 720 50C960 60 1200 20 1440 50V80H0V50Z',
      'M0 50C240 20 480 60 720 50C960 20 1200 60 1440 50V80H0V50Z',
    ],
  }

  return (
    <div
      className={`absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none ${
        position === 'top' ? 'top-0 -translate-y-[1px]' : 'bottom-0 translate-y-[1px]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative block w-full h-[40px] md:h-[60px] lg:h-[80px] ${flip}`}
        preserveAspectRatio="none"
      >
        {/* Layer 3 - Slowest, most subtle */}
        <motion.path
          d={wavePaths.wave3[0]}
          fill={color}
          initial={false}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: wavePaths.wave3,
                  opacity: [0.7, 0.85, 0.7],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'auto' }}
        />

        {/* Layer 2 - Medium speed */}
        <motion.path
          d={wavePaths.wave2[0]}
          fill={color}
          initial={false}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: wavePaths.wave2,
                  opacity: [0.75, 0.9, 0.75],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'auto' }}
        />

        {/* Layer 1 - Fastest, most visible */}
        <motion.path
          d={wavePaths.wave1[0]}
          fill={color}
          initial={false}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: wavePaths.wave1,
                  opacity: [0.8, 1, 0.8],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'auto' }}
        />
      </svg>
    </div>
  )
}
