import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { fadeInUp } from '../../styles/animations'
import WaveDivider from '../ui/WaveDivider'
import SteamEffect from '../animations/SteamEffect'

export default function PotBrewingShowcase() {
  const containerRef = useRef(null)
  const { ref, isInView } = useScrollAnimation(0.1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-40 bg-brand-cream overflow-hidden"
    >
      <WaveDivider position="top" color="var(--color-brand-offwhite)" />

      {/* Background decorative text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 font-serif text-[16rem] md:text-[22rem] text-brand-amber/[0.03] select-none pointer-events-none leading-none whitespace-nowrap">
        壺沖
      </div>

      <SteamEffect count={25} startY="40%" height={220} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Real image with blob mask */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* Organic blob shape clip */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Pulsing blob border */}
              <motion.div
                animate={{
                  borderRadius: [
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                    '30% 60% 70% 40% / 50% 60% 30% 60%',
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 bg-brand-amber/10"
              />
              {/* Image container */}
              <motion.div
                animate={{
                  borderRadius: [
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                    '30% 60% 70% 40% / 50% 60% 30% 60%',
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative overflow-hidden aspect-square"
              >
                <img
                  src="/images/feature.jpg"
                  alt="壺沖現泡"
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent" />
              </motion.div>

              {/* Decorative ring */}
              <motion.div
                animate={{
                  borderRadius: [
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                    '30% 60% 70% 40% / 50% 60% 30% 60%',
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                  ],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute -inset-6 border border-brand-amber/15 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div style={{ y: contentY }}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-display text-xs tracking-[0.4em] text-brand-amber uppercase"
            >
              Pot Brewing
            </motion.span>

            <div className="overflow-hidden mt-4">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-dark tracking-wider leading-snug"
              >
                從熱泡到冷泡
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-dark tracking-wider leading-snug"
              >
                從冰釀到手沖
              </motion.h2>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-12 h-px bg-brand-amber mt-8 mb-8 origin-left"
            />

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-sans text-base text-brand-gray leading-loose mb-6"
            >
              是我們對茶的新體悟。每一壺手沖，都是茶香師與茶葉之間的對話。
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-sans text-base text-brand-gray leading-loose mb-10"
            >
              紫砂壺的溫潤質地，恰到好處的水溫與時間，60秒的靜待，喚醒茶葉最深層的甘甜。這不只是一杯茶，是我們對台灣土地與茶文化最真誠的致敬。
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: '壺沖手法', value: '紫砂壺手沖' },
                { label: '萃取時間', value: '60 秒' },
                { label: '茶葉來源', value: '台灣單品' },
                { label: '茶師認證', value: '國家級評茶' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                  className="border-l-2 border-brand-amber/30 pl-4"
                >
                  <p className="text-xs text-brand-gray-light tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-serif text-lg text-brand-dark tracking-wider">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <WaveDivider position="bottom" color="var(--color-brand-offwhite)" />
    </section>
  )
}
