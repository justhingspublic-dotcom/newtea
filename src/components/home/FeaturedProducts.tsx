import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { featuredProducts } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'

function ProductCard({
  product,
  index,
}: {
  product: (typeof featuredProducts)[0]
  index: number
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-[220px] md:w-[260px] group cursor-grab active:cursor-grabbing select-none"
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] mb-5 overflow-hidden rounded-sm bg-brand-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-all duration-500" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-brand-amber/90 text-white text-[10px] tracking-wider px-3 py-1 backdrop-blur-sm">
          {product.category}
        </div>
      </div>

      {/* Info */}
      <div className="pointer-events-none">
        <p className="font-display text-[10px] tracking-[0.3em] text-brand-amber uppercase mb-1">
          {product.nameEn}
        </p>
        <h3 className="font-serif text-lg text-brand-dark tracking-wider mb-2 group-hover:text-brand-amber transition-colors duration-300">
          {product.name}
        </h3>
        <motion.p
          className="font-sans text-xs text-brand-gray leading-relaxed line-clamp-2 overflow-hidden"
          initial={{ maxHeight: '2.5em' }}
          whileHover={{ maxHeight: '5em' }}
        >
          {product.description}
        </motion.p>
        <p className="font-sans text-sm text-brand-amber-dark mt-2 font-medium">
          NT$ {product.price}
        </p>
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  const { ref, isInView } = useScrollAnimation(0.05)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  const updateConstraints = useCallback(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      setDragConstraints({
        left: -(scrollWidth - clientWidth),
        right: 0,
      })
    }
  }, [])

  useEffect(() => {
    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [updateConstraints])

  // Wheel scroll handler
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll — hijack for carousel
        e.preventDefault()
        const newX = x.get() - e.deltaX
        const boundedX = Math.max(dragConstraints.left, Math.min(0, newX))
        x.set(boundedX)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [dragConstraints, x])

  const scrollProgress = useTransform(
    x,
    [dragConstraints.left || -1, 0],
    [100, 0]
  )

  return (
    <section className="py-24 md:py-32 bg-brand-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={ref}>
          <SectionTitle
            number="— 02"
            titleEn="Featured Drinks"
            titleZh="特色飲品"
            subtitle="每一杯都是茶香師的精心之作"
          />
        </div>
      </div>

      {/* Draggable & Scrollable Carousel */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4"
      >
        <motion.div
          ref={carouselRef}
          className="flex gap-6 md:gap-8 pl-6 md:pl-[max(24px,calc((100vw-1280px)/2+40px))] pr-12 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={dragConstraints}
          style={{ x }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10">
          <div className="flex items-center gap-4">
            <span className="font-display text-[10px] tracking-[0.2em] text-brand-gray-light uppercase">
              Scroll / Drag
            </span>
            <div className="flex-1 h-px bg-brand-amber/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-amber"
                style={{ width: useTransform(scrollProgress, (v) => `${Math.max(0, Math.min(100, v))}%`) }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
