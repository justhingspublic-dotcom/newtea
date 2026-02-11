import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  onClick,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer'

  const variants = {
    primary:
      'bg-brand-amber text-white hover:bg-brand-amber-dark active:scale-[0.98] tracking-[0.1em]',
    secondary:
      'bg-brand-green text-white hover:bg-brand-green-dark active:scale-[0.98] tracking-[0.1em]',
    outline:
      'border border-current text-current hover:bg-white/10 hover:backdrop-blur-sm active:scale-[0.98] tracking-[0.1em]',
    ghost:
      'text-brand-amber hover:bg-brand-amber/10 active:scale-[0.98] tracking-[0.1em]',
  }

  const sizes = {
    sm: 'px-5 py-2 text-xs gap-1.5',
    md: 'px-7 py-3 text-sm gap-2',
    lg: 'px-10 py-4 text-base gap-2.5',
  }

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClasses}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
