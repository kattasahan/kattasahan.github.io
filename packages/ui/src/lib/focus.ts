import type { CSSProperties } from 'react'

export function focusRing(color: string): CSSProperties {
  return {
    outline: `3px solid ${color}`,
    outlineOffset: '2px',
  }
}
