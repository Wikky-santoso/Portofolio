import { useCallback, useSyncExternalStore } from 'react'

export const QUERIES = {
  reduced: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
  horizontal: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
}

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
