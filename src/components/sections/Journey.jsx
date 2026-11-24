import { useLayoutEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '../../lib/gsap.js'
import { EASE, VIEWPORT } from '../../lib/motion.js'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'
import { journey } from '../../data/content.js'
import { SectionHeader } from '../ui/SectionHeader.jsx'
import { TextReveal } from '../ui/TextReveal.jsx'

export function Journey() {
  const ref = useRef(null)
  const reduced = useMediaQuery(QUERIES.reduced)

  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-timeline-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )

      gsap.utils.toArray('[data-node]').forEach((node) => {
        gsap.fromTo(
          node,
          { backgroundColor: '#111214', scale: 1 },
          {
            backgroundColor: '#b8ff65',
            scale: 1.35,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 68%', toggleActions: 'play none none reverse' },
          },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="journey"
      ref={ref}
      aria-labelledby="journey-title"
      className="relative scroll-mt-20 py-24 sm:py-32 lg:py-44"
    >
      <div className="container-x">
        <SectionHeader number="04" title="Journey" />

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2
                id="journey-title"
                className="font-display text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase"
              >
                <TextReveal text="My *journey* so far." />
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
                Education and the steps I&apos;ve taken toward becoming a software engineer.
              </p>
            </div>
          </div>

          <ol data-timeline className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[9px]"
            />
            <div
              data-timeline-fill
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent sm:left-[9px]"
              style={reduced ? undefined : { transform: 'scaleY(0)' }}
            />

            {journey.map((step, index) => (
              <motion.li
                key={step.title}
                className="relative pb-14 pl-10 last:pb-0 sm:pl-14"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <span
                  data-node
                  aria-hidden="true"
                  className={`absolute top-1.5 left-0 size-[15px] border border-accent sm:size-[19px] ${reduced ? 'bg-accent' : 'bg-night'}`}
                />
                <p className="font-display text-xs tracking-[0.2em] text-accent uppercase">
                  <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span> —{' '}
                  {step.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-1 font-display text-sm tracking-wide text-ink/80 sm:text-base">
                  {step.subtitle}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
