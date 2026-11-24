import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../lib/gsap.js'
import { EASE, VIEWPORT, staggerContainer } from '../../lib/motion.js'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'
import { projects } from '../../data/content.js'
import { useSmoothScroll } from '../SmoothScroll.jsx'
import { ProjectVisual } from '../ProjectVisual.jsx'
import { ProjectModal } from '../ProjectModal.jsx'
import { SectionHeader } from '../ui/SectionHeader.jsx'
import { TextReveal } from '../ui/TextReveal.jsx'
import { Tilt } from '../ui/Tilt.jsx'

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

function ProjectPanel({ project, horizontal, onOpen }) {
  const open = () => onOpen(project)

  return (
    <motion.article
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      initial="hidden"
      whileInView="visible"
      viewport={horizontal ? { once: true, amount: 0.2 } : VIEWPORT}
      variants={staggerContainer(0.09)}
      aria-labelledby={`${project.id}-title`}
    >
      <motion.div variants={item} className="lg:order-2 lg:col-span-7">
        <Tilt max={4}>
          <button
            type="button"
            onClick={open}
            data-cursor="View"
            aria-label={`View details of ${project.title}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden border border-line text-left transition-colors duration-500 hover:border-accent/60 sm:aspect-[16/11]"
          >
            <div data-visual-parallax className="absolute -inset-[6%]">
              <div className="size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
                <ProjectVisual type={project.visual} />
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute top-4 left-4 bg-night px-3 py-1.5 font-display text-[11px] tracking-[0.2em] text-accent uppercase"
            >
              {project.number} / {String(projects.length).padStart(2, '0')}
            </span>
          </button>
        </Tilt>
      </motion.div>

      <div className="lg:order-1 lg:col-span-5">
        <motion.div variants={item} className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="text-outline font-display text-6xl leading-none font-bold tabular-nums sm:text-8xl"
          >
            {project.number}
          </span>
          <span className="font-display text-[11px] tracking-[0.2em] text-muted uppercase sm:text-xs">
            {project.category}
          </span>
        </motion.div>

        <motion.h3
          variants={item}
          id={`${project.id}-title`}
          className="font-display text-[clamp(2rem,4.4vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.02em] uppercase"
        >
          {project.title}
        </motion.h3>

        <motion.p variants={item} className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          {project.description}
        </motion.p>

        <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="border border-line px-3 py-1.5 font-display text-[11px] tracking-[0.12em] uppercase sm:text-xs"
            >
              {tech}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="mt-8">
          <button
            type="button"
            onClick={open}
            className="group inline-flex min-h-12 items-center gap-3 border-b border-accent pb-1.5 font-display text-sm font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:text-accent"
          >
            View details
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>
      </div>
    </motion.article>
  )
}

function Intro() {
  return (
    <div className="flex h-full flex-col justify-center">
      <SectionHeader number="02" title="Selected Works" />
      <h2
        id="projects-title"
        className="mt-10 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase sm:mt-14"
      >
        <TextReveal text="Selected ~works~" />
      </h2>
      <p className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">
        Two projects, from a full-stack management system to a hardware-backed IoT prototype.
      </p>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const triggerRef = useRef(null)
  const horizontal = useMediaQuery(QUERIES.horizontal)
  const { lenis } = useSmoothScroll()
  const [selected, setSelected] = useState(null)
  const [lastOpener, setLastOpener] = useState(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (horizontal) {
        const track = trackRef.current
        const distance = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.6,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })
        triggerRef.current = tween.scrollTrigger

        gsap.utils.toArray('[data-visual-parallax]').forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: 4 },
            {
              xPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('article'),
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
      } else if (!window.matchMedia(QUERIES.reduced).matches) {
        gsap.utils.toArray('[data-visual-parallax]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      }
    }, sectionRef)

    return () => {
      triggerRef.current = null
      ctx.revert()
    }
  }, [horizontal])

  const revealPanel = (index) => {
    const st = triggerRef.current
    if (!horizontal || !st) return
    const y = st.start + ((st.end - st.start) * index) / projects.length
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
    else window.scrollTo(0, y)
  }

  const panelWrap = horizontal ? 'flex h-svh w-screen shrink-0 items-center px-[clamp(1.25rem,4vw,3.5rem)]' : ''

  return (
    <section id="projects" ref={sectionRef} aria-labelledby="projects-title" className="relative">
      <div className={horizontal ? 'relative h-svh overflow-clip' : 'container-x py-24 sm:py-32'}>
        <div ref={trackRef} className={horizontal ? 'flex h-full w-max will-change-transform' : ''}>
          <div className={horizontal ? `${panelWrap} w-[min(100vw,70rem)]` : ''}>
            <Intro />
          </div>

          {projects.map((project, index) => (
            <div
              key={project.id}
              className={horizontal ? panelWrap : 'mt-24 border-t border-line pt-14 sm:mt-32 sm:pt-20'}
              onFocusCapture={() => revealPanel(index + 1)}
            >
              <div className="mx-auto w-full max-w-[1500px]">
                <ProjectPanel
                  project={project}
                  horizontal={horizontal}
                  onOpen={(p) => {
                    setLastOpener(document.activeElement)
                    setSelected(p)
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {horizontal && (
          <div className="pointer-events-none absolute inset-x-0 bottom-8 container-x" aria-hidden="true">
            <div className="flex items-center gap-4 font-display text-[11px] tracking-[0.2em] text-muted uppercase">
              <span>Scroll</span>
              <div className="h-px flex-1 bg-line">
                <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
              </div>
              <span>{String(projects.length).padStart(2, '0')} projects</span>
            </div>
          </div>
        )}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => {
          setSelected(null)
          lastOpener?.focus?.()
        }}
      />
    </section>
  )
}
