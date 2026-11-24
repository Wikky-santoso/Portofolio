import { ArrowUpRight } from 'lucide-react'
import { Magnetic } from './Magnetic.jsx'
import { useSmoothScroll } from '../SmoothScroll.jsx'

const VARIANTS = {
  primary: {
    base: 'border-accent bg-accent text-night',
    wipe: 'bg-ink',
    text: '',
  },
  ghost: {
    base: 'border-line text-ink hover:border-accent',
    wipe: 'bg-accent',
    text: 'group-hover:text-night',
  },
}

export function Button({
  href,
  children,
  variant = 'primary',
  icon: Icon = ArrowUpRight,
  external = false,
  download,
  onClick,
  className = '',
}) {
  const { scrollToId } = useSmoothScroll()
  const style = VARIANTS[variant]
  const isAnchor = href?.startsWith('#')
  const Comp = href ? 'a' : 'button'

  const linkProps = href
    ? {
        href,
        ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
        ...(download !== undefined && { download }),
      }
    : { type: 'button' }

  const handleClick = (event) => {
    if (isAnchor) {
      event.preventDefault()
      scrollToId(href.slice(1))
    }
    onClick?.(event)
  }

  return (
    <Magnetic className={className}>
      <Comp
        {...linkProps}
        onClick={handleClick}
        className={`group relative inline-flex min-h-12 items-center gap-3 overflow-hidden border px-6 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.16em] sm:px-7 sm:py-4 sm:text-sm ${style.base}`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${style.wipe}`}
        />
        <span className={`relative transition-colors duration-300 ${style.text}`}>{children}</span>
        <Icon
          aria-hidden="true"
          className={`relative size-4 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${style.text}`}
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </Comp>
    </Magnetic>
  )
}
