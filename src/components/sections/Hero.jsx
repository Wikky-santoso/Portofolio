import { useLayoutEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import { gsap } from '../../lib/gsap.js'
import { EASE } from '../../lib/motion.js'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'
import { useSmoothScroll } from '../SmoothScroll.jsx'
import { Button } from '../ui/Button.jsx'
import { Particles } from '../ui/Particles.jsx'
import { TextReveal } from '../ui/TextReveal.jsx'

const HEADLINE = 'BUILDING *DIGITAL* ~EXPERIENCES~ THROUGH CODE & *CREATIVITY.*'

export function Hero({ ready }) {
  const sectionRef = useRef(null)
  const { scrollToId } = useSmoothScroll()
  const fine = useMediaQuery(QUERIES.finePointer)
  const reduced = useMediaQuery(QUERIES.reduced)
  const interactive = fine && !reduced

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spotX = useSpring(useMotionValue(50), { stiffness: 90, damping: 22 })
  const spotY = useSpring(useMotionValue(40), { stiffness: 90, damping: 22 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}% ${spotY}%, rgba(184,255,101,0.11), transparent 62%)`
  const gridX = useSpring(useTransform(px, [-0.5, 0.5], [14, -14]), { stiffness: 60, damping: 20 })
  const gridY = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), { stiffness: 60, damping: 20 })
  const dotsX = useSpring(useTransform(px, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 })
  const dotsY = useSpring(useTransform(py, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 })

  const onPointerMove = (event) => {
    if (!interactive) return
    const rect = sectionRef.current.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width
    const ny = (event.clientY - rect.top) / rect.height
    px.set(nx - 0.5)
    py.set(ny - 0.5)
    spotX.set(nx * 100)
    spotY.set(ny * 100)
  }

  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
      gsap.to('[data-hero-content]', { yPercent: -12, opacity: 0.15, ease: 'none', scrollTrigger })
      gsap.to('[data-hero-bg]', { yPercent: 18, ease: 'none', scrollTrigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const state = ready ? 'visible' : 'hidden'

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <div data-hero-bg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" style={interactive ? { x: gridX, y: gridY } : undefined}>
          <div className="absolute -inset-x-16 -top-16 bottom-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_20%,transparent_75%)]">
            <div className="bg-grid animate-grid h-[calc(100%+4rem)] w-full motion-reduce:animate-none" />
          </div>
        </motion.div>
        <motion.div className="absolute inset-0" style={interactive ? { x: dotsX, y: dotsY } : undefined}>
          <Particles />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
      </div>

      <div
        data-hero-content
        className="container-x flex flex-1 flex-col justify-between gap-10 pt-28 pb-8 sm:pt-32 sm:pb-10"
      >
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <p className="inline-flex items-center gap-3 border border-line bg-night/60 px-4 py-2 font-display text-[11px] tracking-[0.18em] text-ink uppercase backdrop-blur-sm sm:text-xs">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Available for internship
          </p>
          <p className="font-display text-[11px] tracking-[0.18em] text-muted uppercase sm:text-xs">
            Internship / Remote
          </p>
        </motion.div>

        <div>
          <p className="mb-5 font-display text-xs tracking-[0.2em] text-muted uppercase sm:mb-7 sm:text-sm">
            <span className="overflow-hidden inline-block align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: ready ? '0%' : '110%' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              >
                <span className="text-ink">Wikky Santoso</span> — Software Engineer / Full-Stack Developer
              </motion.span>
            </span>
          </p>

          <h1
            id="hero-title"
            className="max-w-[18ch] text-[clamp(2.25rem,8.4vw,9.5rem)] leading-[0.92] font-bold tracking-[-0.03em] uppercase"
          >
            <TextReveal text={HEADLINE} play={ready} delay={0.3} stagger={0.07} />
          </h1>
        </div>

        <div className="grid items-end gap-8 md:grid-cols-12">
          <motion.p
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg md:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          >
            Information Technology student building full-stack web products — from the interface to
            the API and the database.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 md:col-span-7 md:justify-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            <Button href="#projects" icon={ArrowRight}>
              View projects
            </Button>
            <Button href="#contact" variant="ghost" icon={Mail}>
              Contact me
            </Button>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToId('about')}
          aria-label="Scroll to about section"
          className="group flex w-fit items-center gap-4 font-display text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <span className="relative block h-12 w-px overflow-hidden bg-line" aria-hidden="true">
            <span className="animate-scroll-cue absolute inset-0 bg-accent motion-reduce:animate-none" />
          </span>
          Scroll
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  )
}
