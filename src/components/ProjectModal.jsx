import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { EASE, EASE_IN_OUT } from '../lib/motion.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { ProjectVisual } from './ProjectVisual.jsx'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const fade = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
})

function Block({ number, title, children, delay }) {
  return (
    <motion.section
      {...fade(delay)}
      className="grid gap-4 border-t border-line py-8 sm:py-10 md:grid-cols-12 md:gap-8"
    >
      <h3 className="flex items-baseline gap-3 font-display text-xs tracking-[0.2em] text-muted uppercase md:col-span-3">
        <span className="text-accent tabular-nums">{number}</span>
        {title}
      </h3>
      <div className="text-base leading-relaxed text-ink/90 sm:text-lg md:col-span-9">{children}</div>
    </motion.section>
  )
}

function Dialog({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = `${project.id}-dialog-title`

  useScrollLock(true)

  useEffect(() => {
    closeRef.current?.focus()
    const panel = panelRef.current

    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const nodes = panel.querySelectorAll(FOCUSABLE)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const { detail } = project

  return (
    <motion.div
      className="fixed inset-0 z-[90]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.7 } }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-night/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 w-full overflow-y-auto overscroll-contain border-l border-line bg-night md:w-[min(56rem,90vw)]"
        initial={{ clipPath: 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0%)' }}
        exit={{ clipPath: 'inset(0 0 0 100%)' }}
        transition={{ duration: 0.75, ease: EASE_IN_OUT }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-night/85 px-5 py-4 backdrop-blur-md sm:px-10">
          <span className="font-display text-xs tracking-[0.2em] text-muted uppercase">
            <span className="text-accent">{project.number}</span> — {project.category}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="group flex min-h-11 items-center gap-3 border border-line px-4 font-display text-xs tracking-[0.16em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-night"
          >
            Close
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="px-5 pt-10 pb-16 sm:px-10 sm:pt-14">
          <motion.h2
            {...fade(0.35)}
            id={titleId}
            className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.02em] uppercase"
          >
            {project.title}
          </motion.h2>

          <motion.div {...fade(0.45)} className="mt-8 aspect-[16/10] w-full overflow-hidden border border-line sm:mt-10">
            <ProjectVisual type={project.visual} />
          </motion.div>

          <div className="mt-10">
            <Block number="01" title="Overview" delay={0.5}>
              <p>{detail.overview}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 border border-accent/40 px-3 py-1.5 font-display text-xs tracking-wide"
                  >
                    <span className="size-1.5 bg-accent" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Block>

            <Block number="02" title="Problem" delay={0.55}>
              <p>{detail.problem}</p>
            </Block>

            <Block number="03" title="Solution" delay={0.6}>
              <p>{detail.solution}</p>
            </Block>

            <Block number="04" title="Technical implementation" delay={0.65}>
              <ul className="space-y-3">
                {detail.implementation.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-[0.7em] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </Block>

            <Block number="05" title="Technologies used" delay={0.7}>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-3.5 py-2 font-display text-xs tracking-[0.12em] uppercase"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectModal({ project, onClose }) {
  return createPortal(
    <AnimatePresence>{project && <Dialog key={project.id} project={project} onClose={onClose} />}</AnimatePresence>,
    document.body,
  )
}
