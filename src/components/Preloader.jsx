import { useEffect, useRef } from 'react'
import { animate, motion } from 'motion/react'
import { EASE_IN_OUT } from '../lib/motion.js'
import { QUERIES, useMediaQuery } from '../hooks/useMediaQuery.js'
import { TextReveal } from './ui/TextReveal.jsx'

const assetsReady = () =>
  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener('load', resolve, { once: true })),
  ])

export function Preloader({ onDone }) {
  const countRef = useRef(null)
  const barRef = useRef(null)
  const reduced = useMediaQuery(QUERIES.reduced)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    let cancelled = false
    const ready = assetsReady()

    const controls = animate(0, 100, {
      duration: reduced ? 0.4 : 2.4,
      ease: EASE_IN_OUT,
      onUpdate: (value) => {
        const rounded = Math.round(value)
        if (countRef.current) countRef.current.textContent = String(rounded).padStart(3, '0')
        if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`
      },
      onComplete: async () => {
        await ready
        if (!cancelled) setTimeout(() => doneRef.current(), reduced ? 0 : 250)
      },
    })

    return () => {
      cancelled = true
      controls.stop()
    }
  }, [reduced])

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-night px-5 py-6 sm:px-10 sm:py-10"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: reduced ? 0.01 : 1, ease: EASE_IN_OUT } }}
    >
      <div className="flex items-start justify-between gap-6 font-display text-[11px] tracking-[0.2em] text-muted uppercase sm:text-xs">
        <span className="flex items-center gap-3">
          <span className="size-2 bg-accent" aria-hidden="true" />
          Portfolio
        </span>
        <span className="text-right">Software Engineer / Full-Stack</span>
      </div>

      <div className="font-display leading-[0.88] font-bold tracking-tight uppercase">
        <div className="text-[clamp(3rem,13vw,13rem)]">
          <TextReveal text="Wikky" play stagger={0.1} delay={0.1} />
        </div>
        <div className="text-[clamp(3rem,13vw,13rem)]">
          <TextReveal text="~Santoso~" play stagger={0.1} delay={0.25} />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between font-display">
          <span className="text-[11px] tracking-[0.2em] text-muted uppercase sm:text-xs">
            Loading experience
          </span>
          <span className="text-5xl leading-none font-semibold text-accent tabular-nums sm:text-7xl">
            <span ref={countRef}>000</span>
          </span>
        </div>
        <div className="h-px w-full bg-line">
          <div
            ref={barRef}
            className="h-full origin-left bg-accent"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
