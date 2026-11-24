import { motion } from 'motion/react'
import { techStack } from '../../data/content.js'
import { EASE, VIEWPORT, staggerContainer } from '../../lib/motion.js'
import { SectionHeader } from '../ui/SectionHeader.jsx'
import { TextReveal } from '../ui/TextReveal.jsx'

const chip = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

const rise = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

function Category({ category, index }) {
  return (
    <motion.article
      className={`group relative border border-line p-6 transition-colors duration-500 hover:border-accent/50 sm:p-8 ${category.span}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer(0.07, 0.1)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-surface opacity-0 transition-opacity duration-500 group-hover:opacity-60"
      />
      <header className="mb-10 flex items-start justify-between gap-4 overflow-hidden sm:mb-14">
        <h3 className="overflow-hidden font-display text-3xl font-semibold tracking-tight uppercase sm:text-5xl">
          <motion.span variants={rise} className="block">
            {category.name}
          </motion.span>
        </h3>
        <span className="font-display text-xs tracking-[0.2em] text-accent tabular-nums">
          {category.number}
        </span>
      </header>

      <ul className="flex flex-wrap gap-2.5 sm:gap-3">
        {category.items.map((item, itemIndex) => (
          <motion.li key={item} variants={chip}>
            <span
              className="animate-float block motion-reduce:animate-none"
              style={{ animationDelay: `${-((index * 5 + itemIndex * 3) % 7)}s` }}
            >
              <span className="block border border-line bg-night px-4 py-2.5 font-display text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-night sm:px-5 sm:py-3 sm:text-base">
                {item}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}

export function TechStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative scroll-mt-20 py-24 sm:py-32 lg:py-44"
    >
      <div className="container-x">
        <SectionHeader number="03" title="Tech Stack" />

        <div className="mt-14 mb-14 grid gap-8 sm:mt-20 sm:mb-20 lg:grid-cols-12">
          <h2
            id="stack-title"
            className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase lg:col-span-8"
          >
            <TextReveal text="Tools I *build* with." />
          </h2>
          <p className="max-w-sm self-end text-base leading-relaxed text-muted sm:text-lg lg:col-span-4">
            The technologies I use day to day, grouped by where they sit in a full-stack project.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {techStack.map((category, index) => (
            <Category key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
