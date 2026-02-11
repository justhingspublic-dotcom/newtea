import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(() => {
    // Only show on first visit within this session
    if (sessionStorage.getItem('intro-played')) return false
    return true
  })
  const [animationData, setAnimationData] = useState(null)
  const [showLogo, setShowLogo] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (!isVisible) return
    fetch('/animations/tea-pour.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setIsVisible(false))
  }, [isVisible])

  useEffect(() => {
    if (!animationData) return
    // Show logo sliding up from bottom after a moment
    const logoTimer = setTimeout(() => setShowLogo(true), 800)
    // Gentle fade-out as animation nears completion
    const fadeTimer = setTimeout(() => setFadeOut(true), 5000)
    // Remove loader after fade completes and mark as played
    const exitTimer = setTimeout(() => {
      sessionStorage.setItem('intro-played', '1')
      setIsVisible(false)
    }, 6200)
    return () => {
      clearTimeout(logoTimer)
      clearTimeout(fadeTimer)
      clearTimeout(exitTimer)
    }
  }, [animationData])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-brand-cream flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
        >
          {animationData && (
            <motion.div
              className="w-[400px] h-[400px] md:w-[520px] md:h-[520px]"
              initial={{ opacity: 0, y: 8 }}
              animate={
                fadeOut
                  ? { opacity: 0, y: -16 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                fadeOut
                  ? { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
                  : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
              }
            >
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          )}

          {/* Logo from bottom */}
          <motion.img
            src="/images/logo.png"
            alt="樂台羽茶"
            className="h-10 md:h-12 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={
              fadeOut
                ? { opacity: 0, y: -10 }
                : showLogo
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
            }
            transition={
              fadeOut
                ? { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
