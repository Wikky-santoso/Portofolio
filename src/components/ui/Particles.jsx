import { useEffect, useRef } from 'react'
import { QUERIES, useMediaQuery } from '../../hooks/useMediaQuery.js'

export function Particles({ className = '' }) {
  const canvasRef = useRef(null)
  const reduced = useMediaQuery(QUERIES.reduced)
  const tablet = useMediaQuery(QUERIES.tablet)
  const desktop = useMediaQuery(QUERIES.desktop)
  const count = desktop ? 70 : tablet ? 36 : 16

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frame = 0
    let visible = true

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.00006,
      vy: -(0.00004 + Math.random() * 0.00012),
      a: 0.15 + Math.random() * 0.5,
      accent: Math.random() > 0.55,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (step) => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        if (step) {
          p.x += p.vx * step
          p.y += p.vy * step
          if (p.y < -0.02) p.y = 1.02
          if (p.x < -0.02) p.x = 1.02
          if (p.x > 1.02) p.x = -0.02
        }
        ctx.fillStyle = p.accent ? `rgba(184,255,101,${p.a})` : `rgba(237,237,235,${p.a * 0.5})`
        ctx.fillRect(p.x * width, p.y * height, p.r, p.r)
      }
    }

    let last = performance.now()
    const loop = (now) => {
      const step = Math.min(now - last, 50)
      last = now
      draw(step)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reduced || frame || !visible || document.hidden) return
      last = performance.now()
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    resize()
    draw(0)
    start()

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    observer.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    const onResize = () => {
      resize()
      draw(0)
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [count, reduced])

  return <canvas ref={canvasRef} aria-hidden="true" className={`size-full ${className}`} />
}
