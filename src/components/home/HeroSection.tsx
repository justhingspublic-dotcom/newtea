import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowRight, Coffee, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import WaveDivider from '../ui/WaveDivider'
import { getPublicPath } from '../../utils/paths'

const heroSlides = [
  { src: getPublicPath('images/hero-1.jpg'), mobileSrc: getPublicPath('images/hero-1-mobile.jpg') },
  { src: getPublicPath('images/hero-2.jpg'), mobileSrc: getPublicPath('images/hero-2-mobile.jpg') },
  { src: getPublicPath('images/hero-3.jpg'), mobileSrc: getPublicPath('images/hero-3-mobile.jpg') },
  { src: getPublicPath('images/hero-4.jpg'), mobileSrc: getPublicPath('images/hero-4-mobile.jpg') },
]

// Tea leaf indicator SVG
function TeaLeafDot({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="cursor-pointer p-1.5 group" aria-label="切換幻燈片">
      <svg
        width="16"
        height="26"
        viewBox="0 0 16 26"
        fill="none"
        className={`transition-all duration-400 ${
          active ? '' : 'opacity-60 group-hover:opacity-90'
        }`}
      >
        {/* White border — active only */}
        {active && (
          <path
            d="M8 0C8 0 0 7.5 0 15C0 20.5 3.5 26 8 26C12.5 26 16 20.5 16 15C16 7.5 8 0 8 0Z"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
          />
        )}
        {/* Fill */}
        <motion.path
          d="M8 0C8 0 0 7.5 0 15C0 20.5 3.5 26 8 26C12.5 26 16 20.5 16 15C16 7.5 8 0 8 0Z"
          fill={active ? '#3A7A52' : 'rgba(255,255,255,0.3)'}
          animate={active ? { fill: '#3A7A52' } : { fill: 'rgba(255,255,255,0.3)' }}
          transition={{ duration: 0.4 }}
        />
        {/* Main vein */}
        <path
          d="M8 5V22"
          stroke="white"
          strokeWidth={active ? '0.8' : '0.5'}
          opacity={active ? 0.7 : 0.25}
        />
        {/* Side veins */}
        <path
          d="M8 10L4.5 7.5M8 13.5L4.5 11.5M8 17L5 15M8 10L11.5 7.5M8 13.5L11.5 11.5M8 17L11 15"
          stroke="white"
          strokeWidth={active ? '0.6' : '0.35'}
          opacity={active ? 0.5 : 0.15}
        />
      </svg>
    </button>
  )
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragX = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const goTo = useCallback((index: number) => {
    setCurrentSlide(index)
    animate(dragX, 0, { duration: 0 })
  }, [dragX])

  const prev = useCallback(() => {
    goTo((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }, [currentSlide, goTo])

  const next = useCallback(() => {
    goTo((currentSlide + 1) % heroSlides.length)
  }, [currentSlide, goTo])

  // Auto-play (pause while dragging)
  useEffect(() => {
    if (isDragging) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next, isDragging])

  // Handle drag end
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsDragging(false)
    const threshold = 50
    const velocityThreshold = 300

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      next()
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      prev()
    }
    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] flex items-end justify-center overflow-hidden"
    >
      {/* Swipeable image layer */}
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        style={{ x: dragX }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        {/* Current slide — simple crossfade, no zoom */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.src}
              alt=""
              className="hidden md:block w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
            <img
              src={slide.mobileSrc}
              alt=""
              className="md:hidden w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>

      {/* Top gradient — navbar readability with blur */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px] mask-image-gradient-b z-[1]" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }} />
      {/* Bottom gradient — CTA readability */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Desktop arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/40 hover:text-white transition-all duration-300 cursor-pointer hidden md:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/40 hover:text-white transition-all duration-300 cursor-pointer hidden md:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom CTA area */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-24 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href="https://nidin.shop"
            external
          >
            <Coffee size={18} />
            線上點餐
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/shop"
            className="border-white/50 text-white hover:bg-white hover:text-brand-dark backdrop-blur-sm"
          >
            <ShoppingBag size={18} />
            把茶帶走
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </motion.div>

      {/* Tea leaf indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <TeaLeafDot key={i} active={i === currentSlide} onClick={() => goTo(i)} />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
      >
        <span className="text-white/25 text-[8px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-4 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>

      {/* Wave divider */}
      <WaveDivider position="bottom" color="var(--color-brand-offwhite)" />
    </section>
  )
}
