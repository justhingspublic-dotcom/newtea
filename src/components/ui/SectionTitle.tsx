import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface SectionTitleProps {
  number?: string
  titleEn: string
  titleZh: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionTitle({
  number,
  titleEn,
  titleZh,
  subtitle,
  align = 'left',
  light = false,
}: SectionTitleProps) {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {number && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`font-display text-sm tracking-[0.3em] block ${light ? 'text-brand-amber-light' : 'text-brand-amber'}`}
        >
          {number}
        </motion.span>
      )}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-display text-sm md:text-base tracking-[0.25em] uppercase mt-2 ${light ? 'text-white/60' : 'text-brand-gray-light'}`}
      >
        {titleEn}
      </motion.p>

      {/* Clip-path text reveal */}
      <div className="overflow-hidden mt-4">
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide ${light ? 'text-white' : 'text-brand-dark'}`}
        >
          {titleZh}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`font-sans text-base md:text-lg mt-5 max-w-xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-brand-gray'}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`mt-8 w-16 h-px origin-left ${align === 'center' ? 'mx-auto' : ''} ${light ? 'bg-brand-amber-light' : 'bg-brand-amber'}`}
      />
    </div>
  )
}
