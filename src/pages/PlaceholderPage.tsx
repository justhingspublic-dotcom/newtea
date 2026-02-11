import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

interface PlaceholderPageProps {
  title: string
  titleEn: string
  description: string
}

export default function PlaceholderPage({
  title,
  titleEn,
  description,
}: PlaceholderPageProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-offwhite pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 max-w-lg"
      >
        <p className="font-display text-xs tracking-[0.4em] text-brand-amber uppercase mb-4">
          {titleEn}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-wider mb-4">
          {title}
        </h1>
        <div className="w-12 h-px bg-brand-amber mx-auto mb-6" />
        <p className="font-sans text-sm text-brand-gray leading-relaxed mb-8">
          {description}
        </p>
        <div className="inline-block border border-brand-green/20 text-brand-green/40 text-xs tracking-wider px-6 py-3 mb-10">
          頁面建置中 / Under Construction
        </div>
        <br />
        <Button variant="ghost" href="/">
          <ArrowLeft size={16} />
          返回首頁
        </Button>
      </motion.div>
    </main>
  )
}
