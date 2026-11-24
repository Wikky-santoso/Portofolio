export const EASE = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
