import { motion } from 'framer-motion'
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { fadeInUp, staggerContainer } from '../../styles/animations'

export default function Footer() {
  const { ref, isInView } = useScrollAnimation(0.05)

  return (
    <footer ref={ref} className="bg-brand-dark text-white">
      {/* Main Footer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <img
              src="/images/logo.png"
              alt="樂台羽茶"
              className="h-10 brightness-0 invert mb-4"
            />
            <p className="font-display text-xs tracking-[0.2em] text-white/30 uppercase mb-6">
              Twfun Tea
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              一杯最甘好的感動
              <br />
              堅持手沖台灣單品茶
              <br />
              60秒甘甘萃萃的不凡體驗
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-serif text-sm tracking-wider text-brand-amber mb-6">
              品牌探索
            </h4>
            <ul className="space-y-3">
              {[
                { name: '杯杯好事', href: '/news' },
                { name: '多麼用心', href: '/about' },
                { name: '選茶點這', href: '/menu' },
                { name: '哪有茶香', href: '/stores' },
                { name: '把茶帶走', href: '/shop' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/40 hover:text-brand-amber-light transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-serif text-sm tracking-wider text-brand-amber mb-6">
              聯絡我們
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-brand-amber mt-0.5 shrink-0"
                />
                <span className="text-sm text-white/40">
                  高雄市左營區孟子路360號
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-amber shrink-0" />
                <span className="text-sm text-white/40">0989 178 168</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-amber shrink-0" />
                <span className="text-sm text-white/40">
                  info@twfuntea.com
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Franchise CTA + Social */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-serif text-sm tracking-wider text-brand-amber mb-6">
              加盟專區
            </h4>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              想擁有一間自己的茶飲店嗎？加入樂台羽茶，讓好茶走入更多人的生活。
            </p>
            <a
              href="/franchise"
              className="inline-flex items-center px-6 py-2.5 border border-brand-amber text-brand-amber text-sm tracking-wider hover:bg-brand-amber hover:text-white transition-all duration-300"
            >
              了解加盟
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="text-white/30 hover:text-brand-amber-light transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-white/30 hover:text-brand-amber-light transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25 tracking-wider">
            &copy; {new Date().getFullYear()} 樂台羽茶 TWFUN TEA. All Rights
            Reserved.
          </p>
          <p className="text-xs text-white/15 tracking-wider">
            SITE DESIGNED WITH CARE
          </p>
        </div>
      </div>
    </footer>
  )
}
