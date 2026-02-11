import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeInUp } from '../../styles/animations'
import FloatingLeaves from '../ui/FloatingLeaves'

const features = [
  {
    id: 1,
    number: '01',
    titleEn: 'Tea Sommelier',
    titleZh: '茶香師',
    subtitle: '茶人哲學',
    description:
      '通過國家級評茶師認證，從選茶、泡茶、品茶，多年歷練一身茶技藝，得以成就獨藝無二的專業。',
    svgContent: (
      <>
        {/* Teapot Body - Classic Zisha Shape */}
        <motion.path
          d="M80 140 C80 140 75 195 140 195 C205 195 200 140 200 140 C200 120 180 110 140 110 C100 110 80 120 80 140 Z"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
        {/* Lid */}
        <motion.path
          d="M105 110 Q140 90 175 110"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }} viewport={{ once: true }}
        />
        {/* Knob */}
        <motion.circle
          cx="140" cy="98" r="6"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }} viewport={{ once: true }}
        />
        {/* Spout */}
        <motion.path
          d="M200 135 Q230 130 235 110"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.8 }} viewport={{ once: true }}
        />
        {/* Handle */}
        <motion.path
          d="M80 135 Q50 135 50 160 Q50 185 85 180"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.8 }} viewport={{ once: true }}
        />
        {/* Steam */}
        {[0, 1].map((i) => (
          <motion.path
            key={i}
            d={`M${135 + i * 10} 85 Q${140 + i * 10} 75 ${135 + i * 10} 65`}
            stroke="currentColor" strokeWidth="1" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2.5, delay: 2.5 + i * 0.5, repeat: Infinity }}
            viewport={{ once: true }}
          />
        ))}
      </>
    ),
  },
  {
    id: 2,
    number: '02',
    titleEn: 'Single Origin',
    titleZh: '手沖台灣單品茶',
    subtitle: '台灣原味',
    description:
      '台灣每座茶山特有的山頭氣，最能展現我們所期盼的迷人韻味，在茶香師的精挑細選、因茶施泡下，每款茶飲有了它最獨一無二的風味。',
    svgContent: (
      <>
        {/* Front Mountain */}
        <motion.path
          d="M60 200 L120 100 L180 200"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
        {/* Back Mountain (Left) */}
        <motion.path
          d="M30 200 L80 130 L100 160"
          stroke="currentColor" strokeWidth="1.2" fill="none"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }}
        />
        {/* Back Mountain (Right) */}
        <motion.path
          d="M160 160 L200 90 L250 200"
          stroke="currentColor" strokeWidth="1.2" fill="none"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }} viewport={{ once: true }}
        />
        {/* Mist/Clouds */}
        <motion.path
          d="M40 180 Q90 160 140 180 T240 170"
          stroke="currentColor" strokeWidth="0.8" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, delay: 1.5 }} viewport={{ once: true }}
        />
        <motion.path
          d="M20 200 H260"
          stroke="currentColor" strokeWidth="1" fill="none"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }}
        />
      </>
    ),
  },
  {
    id: 3,
    number: '03',
    titleEn: '60 Seconds',
    titleZh: '60秒甘甘萃萃',
    subtitle: '精萃時光',
    description:
      '現點現沖，細工手沖每杯茶。用心卻不刻意地讓一切恰到好處，靜待60秒喚醒茶香韻味，品味60秒換得的甘萃，是那麼不平凡。',
    svgContent: (
      <>
        {/* Cup Body */}
        <motion.path
          d="M90 110 Q90 180 140 180 Q190 180 190 110"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
        {/* Rim */}
        <motion.ellipse
          cx="140" cy="110" rx="50" ry="10"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }}
        />
        {/* Liquid level */}
        <motion.path
          d="M100 120 Q140 135 180 120"
          stroke="currentColor" strokeWidth="0.8" fill="none"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2 }} viewport={{ once: true }}
        />
        {/* Saucer */}
        <motion.path
          d="M80 190 Q140 210 200 190"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }} viewport={{ once: true }}
        />
        {/* 60s Text */}
        <motion.text
          x="140" y="155"
          textAnchor="middle"
          className="font-display font-light"
          fontSize="24"
          fill="currentColor"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          viewport={{ once: true }}
        >
          60s
        </motion.text>
      </>
    ),
  },
]

export default function BrandFeatures() {
  const { ref, isInView } = useScrollAnimation(0.05)

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-brand-offwhite overflow-hidden">
      <FloatingLeaves count={6} />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-display text-xs tracking-[0.4em] text-brand-amber uppercase mb-3">
            Our Philosophy
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-brand-dark tracking-wider"
            >
              堅持用心的每一杯
            </motion.h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 w-12 h-px bg-brand-amber mx-auto"
          />
        </motion.div>

        {/* Three Columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={fadeInUp}
              className="text-center group"
            >
              {/* Number */}
              <span className="font-display text-xs tracking-[0.3em] text-brand-gray-light">
                {feature.number}
              </span>

              {/* SVG illustration with line drawing animation */}
              <div className="relative mt-5 mb-6 flex justify-center">
                <svg
                  viewBox="0 0 280 280"
                  className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] text-brand-amber/50"
                  fill="none"
                >
                  {/* Rotating dashed circle */}
                  <motion.circle
                    cx="140" cy="140" r="125"
                    stroke="currentColor" strokeWidth="0.5" fill="none"
                    strokeDasharray="3 6"
                    className="text-brand-amber/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                  />
                  {feature.svgContent}
                </svg>
              </div>

              {/* English label */}
              <p className="font-display text-[10px] tracking-[0.25em] text-brand-gray-light uppercase mb-1.5">
                {feature.titleEn}
              </p>

              {/* Chinese title */}
              <h3 className="font-serif text-xl md:text-2xl text-brand-dark tracking-wider mb-1.5">
                {feature.titleZh}
              </h3>

              {/* Subtitle */}
              <p className="font-serif text-sm text-brand-amber mb-4">
                {feature.subtitle}
              </p>

              {/* Description */}
              <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
