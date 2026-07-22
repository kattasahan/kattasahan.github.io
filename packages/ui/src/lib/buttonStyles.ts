import { colorTokens, spacingTokens, typographyTokens } from '@portfolio/tokens'
import type { CSSProperties } from 'react'
import { sharedStyles, type Theme } from '../theme'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

function transition(properties: string) {
  return `${properties} ${sharedStyles.motion.duration.normal} ${sharedStyles.motion.easing.standard}`
}

export function buttonStyle(color: (typeof colorTokens)[Theme], variant: ButtonVariant): CSSProperties {
  const common: CSSProperties = {
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: sharedStyles.radius.full,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily.sans,
    fontSize: typographyTokens.fontSize.sm,
    fontWeight: typographyTokens.fontWeight.semibold,
    gap: spacingTokens[1],
    justifyContent: 'center',
    lineHeight: typographyTokens.lineHeight.snug,
    minHeight: '2.75rem',
    padding: `${spacingTokens[1]} ${spacingTokens[2]}`,
    textDecoration: 'none',
    transition: transition('background-color, border-color, color, transform'),
  }

  if (variant === 'primary') return { ...common, backgroundColor: color.text, color: color.textInverse }
  if (variant === 'secondary') return { ...common, backgroundColor: color.surface, borderColor: color.border, color: color.text }

  return { ...common, backgroundColor: 'transparent', color: color.text, paddingInline: spacingTokens[1] }
}
