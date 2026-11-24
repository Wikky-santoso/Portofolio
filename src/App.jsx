import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { sectionIds } from './data/content.js'
import { ScrollTrigger } from './lib/gsap.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import { useScrollLock } from './hooks/useScrollLock.js'
import { Preloader } from './components/Preloader.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
import { Cursor } from './components/ui/Cursor.jsx'
import { ScrollProgress } from './components/ui/ScrollProgress.jsx'
import { Hero } from './components/sections/Hero.jsx'
import { About } from './components/sections/About.jsx'
import { Projects } from './components/sections/Projects.jsx'
import { TechStack } from './components/sections/TechStack.jsx'
import { Journey } from './components/sections/Journey.jsx'
import { Contact } from './components/sections/Contact.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const active = useActiveSection(sectionIds)

  useScrollLock(loading)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!loading) {
      const id = window.setTimeout(() => ScrollTrigger.refresh(), 100)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [loading])

  const finish = useCallback(() => setLoading(false), [])

  return (
    <>
      <a
        href="#about"
        className="fixed top-3 left-3 z-[300] -translate-y-24 bg-accent px-4 py-2 font-display text-sm font-semibold text-night uppercase focus:translate-y-0"
      >
        Skip to content
      </a>

      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finish} />}</AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <Navbar active={active} ready={!loading} />

      <main>
        <Hero ready={!loading} />
        <About />
        <Projects />
        <TechStack />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
