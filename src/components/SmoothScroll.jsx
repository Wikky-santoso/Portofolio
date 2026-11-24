import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { QUERIES, useMediaQuery } from '../hooks/useMediaQuery.js'

const SmoothScrollContext = createContext({ lenis: null, scrollToId: () => {} })

export function SmoothScroll({ children }) {
  const reduced = useMediaQuery(QUERIES.reduced)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (reduced) return undefined

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  const scrollToId = useCallback(
    (id) => {
      const el = id === 'top' ? null : document.getElementById(id)
      if (lenis) {
        lenis.scrollTo(el ?? 0, {
          duration: 1.6,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          force: true,
        })
      } else {
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0
        window.scrollTo({ top, behavior: 'auto' })
      }
      window.history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`)
    },
    [lenis],
  )

  const value = useMemo(() => ({ lenis, scrollToId }), [lenis, scrollToId])

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)
