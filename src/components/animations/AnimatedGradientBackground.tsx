import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AnimatedGradientBackgroundProps {
  colors?: string[]
  className?: string
  /** Duration in seconds for one complete cycle */
  duration?: number
  /** Intensity of the gradient movement (subtle | moderate | strong) */
  intensity?: 'subtle' | 'moderate' | 'strong'
}

export default function AnimatedGradientBackground({
  colors = ['var(--color-brand-amber)', 'var(--color-brand-amber-light)'],
  className = '',
  duration = 25,
  intensity = 'subtle',
}: AnimatedGradientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  // Intensity affects the gradient size and movement range
  const intensityConfig = {
    subtle: { size: '150%', opacityRange: '0.95, 1' },
    moderate: { size: '200%', opacityRange: '0.9, 1' },
    strong: { size: '250%', opacityRange: '0.85, 1' },
  }

  const config = intensityConfig[intensity]

  // Generate gradient stops from colors
  const gradientStops = colors.join(', ')

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${gradientStops})`,
          backgroundSize: config.size,
          animation: prefersReducedMotion
            ? 'none'
            : `breatheGradient ${duration}s ease-in-out infinite`,
          willChange: prefersReducedMotion ? 'auto' : 'background-position, opacity',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS animation - GPU accelerated */}
      <style>{`
        @keyframes breatheGradient {
          0%, 100% {
            background-position: 0% 50%;
            opacity: ${config.opacityRange.split(', ')[0]};
          }
          50% {
            background-position: 100% 50%;
            opacity: ${config.opacityRange.split(', ')[1]};
          }
        }
      `}</style>
    </div>
  )
}
