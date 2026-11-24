import { useLayoutEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '../../lib/gsap.js'
import { EASE, VIEWPORT } from '../../lib/motion.js'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'
import { site } from '../../data/content.js'
import { Reveal } from '../ui/Reveal.jsx'
import { ScrubText } from '../ui/ScrubText.jsx'
import { SectionHeader } from '../ui/SectionHeader.jsx'

const STATEMENT =
  'I am an *Information Technology* student interested in building *useful digital products*, exploring *modern technologies*, and solving problems through *software.*'

const facts = [
  { label: 'Studying', value: 'Information Technology' },
  { label: 'Focus', value: 'Software Engineering / Full-Stack' },
  { label: 'Looking for', value: 'Internship & remote roles' },
]

function Portrait() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface">
      <div data-about-parallax className="absolute -inset-y-[8%] inset-x-0">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(184,255,101,0.18),transparent_55%)]"
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className="text-outline absolute -bottom-6 -left-3 font-display text-[clamp(10rem,24vw,22rem)] leading-none font-bold tracking-tighter select-none"
        >
          WS
        </span>
      </div>
      <div className="absolute top-4 left-4 font-display text-[11px] tracking-[0.2em] text-muted uppercase">
        Fig. 01 — Monogram
      </div>
      <div className="absolute right-4 bottom-4 flex items-center gap-2 font-display text-[11px] tracking-[0.2em] text-ink uppercase">
        <span className="size-1.5 bg-accent" aria-hidden="true" />
        {site.name}
      </div>
    </div>
  )
}

export function About() {
  const ref = useRef(null)
  const reduced = useMediaQuery(QUERIES.reduced)
  const desktop = useMediaQuery(QUERIES.desktop)

  useLayoutEffect(() => {
    if (reduced || !desktop) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-parallax]',
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced, desktop])

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      className="relative scroll-mt-20 py-24 sm:py-32 lg:py-44"
    >
      <div className="container-x">
        <SectionHeader number="01" title="About" />
        <h2 id="about-title" className="sr-only">
          About Wikky Santoso
        </h2>

        <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <ScrubText
              text={STATEMENT}
              className="font-display text-[clamp(1.75rem,4.4vw,4.25rem)] leading-[1.12] font-medium tracking-[-0.02em]"
            />

            <Reveal className="mt-12 grid max-w-2xl gap-6 text-base leading-relaxed text-muted sm:mt-16 sm:grid-cols-2 sm:text-lg">
              <p>
                Hi, I&apos;m Wikky. I&apos;m studying at {site.school}, where I&apos;m building my
                foundations in software engineering.
              </p>
              <p>
                I like turning ideas into working products — the interface people see and the API
                and data that sit behind it.
              </p>
            </Reveal>

            <dl className="mt-14 border-t border-line sm:mt-20">
              {facts.map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[12rem_1fr] sm:py-5"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
                >
                  <dt className="font-display text-[11px] tracking-[0.2em] text-muted uppercase sm:text-xs">
                    {label}
                  </dt>
                  <dd className="font-display text-base text-ink sm:text-lg">{value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <Reveal className="mx-auto w-full max-w-md lg:col-span-4 lg:mt-24 lg:max-w-none" delay={0.15}>
            <Portrait />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
