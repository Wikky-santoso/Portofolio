import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../data/content.js'
import { EASE, EASE_IN_OUT } from '../lib/motion.js'
import { useScrollLock } from '../hooks/useScrollLock.js'
import { useSmoothScroll } from './SmoothScroll.jsx'

function Logo({ onClick }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={`${site.name} — back to top`}
      className="group flex items-center gap-3 font-display text-sm font-semibold tracking-[0.14em] uppercase"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center border border-line text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-night"
      >
        WS
      </span>
      <span className="hidden sm:inline">{site.name}</span>
    </a>
  )
}

export function Navbar({ active, ready }) {
  const { scrollToId } = useSmoothScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const go = (id) => (event) => {
    event.preventDefault()
    const wasOpen = open
    setOpen(false)
    if (wasOpen) setTimeout(() => scrollToId(id), 450)
    else scrollToId(id)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[56]"
        initial={{ y: '-100%' }}
        animate={{ y: ready ? 0 : '-100%' }}
        transition={{ duration: 0.9, ease: EASE, delay: ready ? 0.5 : 0 }}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b bg-night/70 backdrop-blur-xl transition-opacity duration-500 ${scrolled && !open ? 'border-line opacity-100' : 'border-transparent opacity-0'}`}
        />
        <div className="container-x relative flex h-16 items-center justify-between sm:h-20">
          <Logo onClick={go('top')} />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`relative block px-4 py-2 font-display text-xs tracking-[0.16em] uppercase transition-colors duration-300 hover:text-ink ${active === id ? 'text-ink' : 'text-muted'}`}
                  >
                    {label}
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-px h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center border border-line transition-colors hover:border-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-night px-5 pt-28 pb-8 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <nav aria-label="Mobile">
              <ul>
                {navLinks.map(({ id, label }, index) => (
                  <li key={id} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={`#${id}`}
                      onClick={go(id)}
                      className={`flex items-baseline gap-4 py-5 font-display text-4xl font-semibold tracking-tight uppercase ${active === id ? 'text-accent' : 'text-ink'}`}
                      initial={{ y: '100%' }}
                      animate={{ y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.2 + index * 0.07 } }}
                      exit={{ y: '100%', transition: { duration: 0.3 } }}
                    >
                      <span className="text-xs font-normal text-muted tabular-nums">
                        0{index + 1}
                      </span>
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.p
              className="font-display text-xs tracking-[0.2em] text-muted uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              {site.role}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
