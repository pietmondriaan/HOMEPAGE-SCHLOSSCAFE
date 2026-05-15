import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    const base = 'Schloss-Café Bleiburg | Café mit Herz'
    document.title = title ? `${title} | ${base}` : base
    return () => { document.title = base }
  }, [title])
}
