import { motion } from 'motion/react'
import { EASE, VIEWPORT, staggerContainer } from '../../lib/motion.js'

const rise = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

const line = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
}

export function SectionHeader({ number, title, className = '' }) {
  return (
    <motion.div
      className={`flex items-center gap-4 font-display text-xs tracking-[0.2em] uppercase sm:gap-6 sm:text-sm ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer(0.12)}
    >
      <span className="overflow-hidden">
        <motion.span variants={rise} className="block text-accent">
          {number}
        </motion.span>
      </span>
      <motion.span variants={line} className="h-px flex-1 origin-left bg-line" aria-hidden="true" />
      <span className="overflow-hidden">
        <motion.span variants={rise} className="block text-muted">
          {title}
        </motion.span>
      </span>
    </motion.div>
  )
}
