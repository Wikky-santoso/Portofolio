import { useMemo } from 'react'
import { motion } from 'motion/react'
import { EASE, VIEWPORT, staggerContainer } from '../../lib/motion.js'
import { WORD_STYLES, parseMarked, stripMarks } from '../../lib/text.js'

const wordVariants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 1, ease: EASE } },
}

export function TextReveal({
  text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  play = 'view',
  ...rest
}) {
  const words = useMemo(() => parseMarked(text), [text])
  const MotionTag = motion[as]

  const trigger =
    play === 'view'
      ? { whileInView: 'visible', viewport: VIEWPORT }
      : { animate: play ? 'visible' : 'hidden' }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={staggerContainer(stagger, delay)}
      {...trigger}
      {...rest}
    >
      <span className="sr-only">{stripMarks(text)}</span>
      {words.map(({ word, style }, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${WORD_STYLES[style]}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </MotionTag>
  )
}
