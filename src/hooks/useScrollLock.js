import { useEffect } from 'react'
import { useSmoothScroll } from '../components/SmoothScroll.jsx'

let activeLocks = 0

export function useScrollLock(locked) {
  const { lenis } = useSmoothScroll()

  useEffect(() => {
    if (!locked) return undefined

    activeLocks += 1
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()

    return () => {
      activeLocks -= 1
      if (activeLocks === 0) {
        document.documentElement.style.overflow = ''
        lenis?.start()
      }
    }
  }, [locked, lenis])
}
