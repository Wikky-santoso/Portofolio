import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'

export function Tilt({ children, max = 5, className = '' }) {
  const fine = useMediaQuery(QUERIES.finePointer)
  const reduced = useMediaQuery(QUERIES.reduced)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 160, damping: 18, mass: 0.4 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const active = fine && !reduced

  const onMove = (event) => {
    if (!active) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={active ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      >
        {children}
      </motion.div>
    </div>
  )
}
