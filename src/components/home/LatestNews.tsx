import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, blurIn } from '../../styles/animations'
import { latestNews } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'

function NewsCard({ news }: { news: (typeof latestNews)[0] }) {
  return (
    <motion.article variants={blurIn} className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] mb-5 overflow-hidden rounded-sm bg-brand-cream">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-brand-dark/70 backdrop-blur-sm text-white text-[10px] tracking-wider px-3 py-1">
          {news.category}
        </div>

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={12} className="text-brand-amber" />
        <time className="font-sans text-xs text-brand-gray-light tracking-wider">
          {news.date}
        </time>
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg text-brand-dark tracking-wider mb-2 group-hover:text-brand-amber transition-colors duration-300">
        {news.title}
      </h3>

      {/* Excerpt */}
      <p className="font-sans text-sm text-brand-gray leading-relaxed mb-4 line-clamp-2">
        {news.excerpt}
      </p>

      {/* Read more */}
      <span className="inline-flex items-center gap-1.5 text-xs text-brand-amber tracking-wider font-medium group-hover:gap-3 transition-all duration-300">
        閱讀更多
        <ArrowRight size={14} />
      </span>
    </motion.article>
  )
}

export default function LatestNews() {
  const { ref, isInView } = useScrollAnimation(0.05)

  return (
    <section className="py-24 md:py-32 bg-brand-offwhite">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          number="— 04"
          titleEn="Latest News"
          titleZh="杯杯好事"
          subtitle="品牌最新消息與活動"
        />

        {/* News Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/news"
            className="inline-flex items-center gap-2 font-sans text-sm text-brand-amber tracking-wider hover:gap-3 transition-all duration-300"
          >
            查看全部消息
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
