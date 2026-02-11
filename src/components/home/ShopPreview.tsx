import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, blurIn } from '../../styles/animations'
import { shopProducts } from '../../data/mockData'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

function ShopCard({ product }: { product: (typeof shopProducts)[0] }) {
  return (
    <motion.div variants={blurIn} className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-sm bg-brand-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-brand-amber text-white text-[10px] tracking-wider px-3 py-1">
            {product.tag}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-all duration-500 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-brand-dark text-xs tracking-wider px-6 py-2.5 inline-flex items-center gap-2">
            查看商品 <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Info */}
      <p className="font-display text-[10px] tracking-[0.2em] text-brand-gray-light uppercase mb-1">
        {product.nameEn}
      </p>
      <h3 className="font-serif text-base text-brand-dark tracking-wider mb-2 group-hover:text-brand-amber transition-colors duration-300">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="font-sans text-sm text-brand-amber-dark font-medium">
          NT$ {product.price}
        </span>
        {product.originalPrice && (
          <span className="font-sans text-xs text-brand-gray-light line-through">
            NT$ {product.originalPrice}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ShopPreview() {
  const { ref, isInView } = useScrollAnimation(0.05)

  return (
    <section className="py-24 md:py-32 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          number="— 03"
          titleEn="Online Shop"
          titleZh="把茶帶走"
          subtitle="精選台灣好茶，宅配到府"
        />

        {/* Product Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-12"
        >
          {shopProducts.map((product) => (
            <ShopCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button variant="primary" size="lg" href="/shop">
            <ShoppingBag size={18} />
            瀏覽全部商品
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
