import { ArrowUp } from 'lucide-react'
import { site } from '../data/content.js'
import { useSmoothScroll } from './SmoothScroll.jsx'

export function Footer() {
  const { scrollToId } = useSmoothScroll()

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-8 font-display text-[11px] tracking-[0.18em] text-muted uppercase sm:flex-row sm:items-center sm:text-xs">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>Designed &amp; built with React</p>
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="group flex min-h-11 items-center gap-3 uppercase tracking-[0.18em] transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUp
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </footer>
  )
}
