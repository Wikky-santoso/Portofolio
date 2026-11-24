import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'

const INTERACTIVE = 'a, button, [role="button"], summary'

export function Cursor() {
  const fine = useMediaQuery(QUERIES.finePointer)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })
  const [mode, setMode] = useState({ hover: false, label: '' })
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!fine) return undefined
    const root = document.documentElement
    root.classList.add('has-cursor')

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setShown(true)
    }

    const onOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const labelEl = target.closest('[data-cursor]')
      const next = {
        hover: Boolean(labelEl || target.closest(INTERACTIVE)),
        label: labelEl?.getAttribute('data-cursor') ?? '',
      }
      setMode((prev) => (prev.hover === next.hover && prev.label === next.label ? prev : next))
    }

    const onLeave = () => setShown(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver)
    root.addEventListener('pointerleave', onLeave)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, x, y])

  if (!fine) return null

  const hasLabel = Boolean(mode.label)

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-accent"
        style={{ x, y, opacity: shown && !hasLabel ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[199] -mt-9 -ml-9 grid size-[72px] place-items-center"
        style={{ x: ringX, y: ringY, opacity: shown ? 1 : 0 }}
      >
        <motion.div
          className="grid size-full place-items-center rounded-full border border-accent/70"
          animate={{
            scale: hasLabel ? 1 : mode.hover ? 0.8 : 0.45,
            backgroundColor: hasLabel ? 'rgba(184,255,101,1)' : 'rgba(184,255,101,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          <span
            className={`text-[11px] font-semibold tracking-[0.14em] text-night uppercase transition-opacity duration-200 ${hasLabel ? 'opacity-100' : 'opacity-0'}`}
          >
            {mode.label}
          </span>
        </motion.div>
      </motion.div>
    </>
  )
}
