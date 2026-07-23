import {
  motionTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens,
} from '@portfolio/tokens'
import { type CSSProperties } from 'react'
export { ThemeProvider, useTheme, type Theme } from '@portfolio/theme'

export function focusRing(color: string): CSSProperties {
  return {
    outline: `3px solid ${color}`,
    outlineOffset: '2px',
  }
}

export const sharedStyles = {
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  motion: motionTokens,
} as const
