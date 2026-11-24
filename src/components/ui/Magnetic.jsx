import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'

export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const fine = useMediaQuery(QUERIES.finePointer)
  const reduced = useMediaQuery(QUERIES.reduced)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 })
  const active = fine && !reduced

  const onMove = (event) => {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block ${className}`}
    >
      <motion.span className="inline-block" style={active ? { x: sx, y: sy } : undefined}>
        {children}
      </motion.span>
    </span>
  )
}
