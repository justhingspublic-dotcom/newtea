import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Clock, Smartphone } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../ui/Button'
import WaveDivider from '../ui/WaveDivider'
import AnimatedGradientBackground from '../animations/AnimatedGradientBackground'

export default function OnlineOrderCTA() {
  const { ref, isInView } = useScrollAnimation(0.15)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Animated warm amber gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatedGradientBackground
          colors={[
            'var(--color-brand-amber)',
            'var(--color-brand-amber-dark)',
            'var(--color-brand-amber-deep)',
          ]}
          duration={25}
          intensity="subtle"
        />
      </motion.div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Large decorative character */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 font-serif text-[20rem] text-white/[0.04] select-none pointer-events-none leading-none">
        茶
      </div>

      <WaveDivider position="top" color="white" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-white/40" />
          <span className="font-display text-xs tracking-[0.4em] text-white/80 uppercase">
            Order Online
          </span>
          <span className="w-8 h-px bg-white/40" />
        </motion.div>

        {/* Title with reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-wider mb-6"
          >
            就這點茶
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-base md:text-lg text-white/80 max-w-lg mx-auto mb-10 leading-relaxed"
        >
          透過 NIDIN 線上點餐系統，隨時隨地享用新鮮手沖好茶。
          <br />
          免排隊，到店即取。
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: <Smartphone size={16} />, text: '手機輕鬆點' },
            { icon: <Clock size={16} />, text: '到店免等候' },
            { icon: <ExternalLink size={16} />, text: '即時訂單追蹤' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs tracking-wider px-5 py-2.5 rounded-full"
            >
              {item.icon}
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="lg"
            href="https://nidin.shop"
            external
            className="border-white text-white hover:bg-white hover:text-brand-amber-dark text-base"
          >
            前往 NIDIN 點餐
            <ExternalLink size={16} />
          </Button>
        </motion.div>
      </div>

      <WaveDivider position="bottom" color="var(--color-brand-offwhite)" />
    </section>
  )
}
