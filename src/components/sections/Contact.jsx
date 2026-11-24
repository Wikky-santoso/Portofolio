import { useLayoutEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons.jsx'
import { gsap } from '../../lib/gsap.js'
import { EASE, VIEWPORT, staggerContainer } from '../../lib/motion.js'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'
import { site } from '../../data/content.js'
import { Button } from '../ui/Button.jsx'
import { SectionHeader } from '../ui/SectionHeader.jsx'
import { TextReveal } from '../ui/TextReveal.jsx'

const links = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: 'GitHub', value: site.githubLabel, href: site.github, icon: GithubIcon, external: true },
  {
    label: 'LinkedIn',
    value: site.linkedinLabel,
    href: site.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
]

const row = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export function Contact() {
  const ref = useRef(null)
  const reduced = useMediaQuery(QUERIES.reduced)

  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-marquee]',
        { xPercent: 0 },
        {
          xPercent: -25,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 sm:py-32 lg:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(184,255,101,0.12),transparent_70%)]"
      />

      <div className="container-x relative">
        <SectionHeader number="05" title="Contact" />

        <h2
          id="contact-title"
          className="mt-14 font-display text-[clamp(2.75rem,10.5vw,11rem)] leading-[0.9] font-bold tracking-[-0.035em] uppercase sm:mt-20"
        >
          <TextReveal text="Let's build *something* ~great.~" stagger={0.08} />
        </h2>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12">
          <motion.ul
            className="border-t border-line lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerContainer(0.1)}
          >
            {links.map(({ label, value, href, icon: Icon, external }) => (
              <motion.li key={label} variants={row} className="border-b border-line">
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  data-cursor="Open"
                  className="group relative flex min-h-20 items-center justify-between gap-4 overflow-hidden px-1 py-5 sm:px-4 sm:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                  />
                  <span className="relative flex min-w-0 items-center gap-4 sm:gap-8">
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-accent transition-colors duration-300 group-hover:text-night"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-[11px] tracking-[0.2em] text-muted uppercase transition-colors duration-300 group-hover:text-night/70">
                        {label}
                      </span>
                      <span className="block truncate font-display text-lg font-medium transition-colors duration-300 group-hover:text-night sm:text-3xl">
                        {value}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="relative size-6 shrink-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-night"
                  />
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-col items-start justify-between gap-8 lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <p className="max-w-xs text-base leading-relaxed text-muted sm:text-lg">
              Open to internship and remote opportunities. If you have a project or a team that
              could use a developer, I would love to hear from you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} icon={Mail}>
                Say hello
              </Button>
              <Button href={site.resume} variant="ghost" icon={Download} download>
                Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none relative mt-24 select-none sm:mt-32">
        <div
          data-contact-marquee
          className="text-outline flex w-max gap-12 font-display text-[clamp(5rem,16vw,16rem)] leading-none font-bold tracking-tighter whitespace-nowrap uppercase opacity-30"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>Wikky Santoso —</span>
          ))}
        </div>
      </div>
    </section>
  )
}
