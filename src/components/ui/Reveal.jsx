import { motion } from 'motion/react'
import { EASE, VIEWPORT } from '../../lib/motion.js'

export function Reveal({ children, delay = 0, y = 32, as = 'div', className = '', ...rest }) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
