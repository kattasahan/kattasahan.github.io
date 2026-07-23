import type { ColorTheme } from '@portfolio/tokens'

export function getSystemTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
