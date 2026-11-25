import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'
import { WORD_STYLES, parseMarked } from '../../lib/text.js'

export function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  const reduced = useMediaQuery(QUERIES.reduced)
  const words = useMemo(() => parseMarked(text), [text])

  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.4 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            end: 'bottom 48%',
            scrub: true,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced, words])

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, style }, index) => (
        <span key={`${word}-${index}`}>
          <span data-word className={WORD_STYLES[style]}>
            {word}
          </span>{' '}
        </span>
      ))}
    </p>
  )
}
