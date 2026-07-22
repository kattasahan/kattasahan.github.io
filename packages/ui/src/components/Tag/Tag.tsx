import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import type { HTMLAttributes } from 'react'
import { sharedStyles, type Theme, useTheme } from '../../theme'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  theme?: Theme
}

export function Tag({ children, style, theme, ...props }: TagProps) {
  const { color } = useTheme(theme)

  return (
    <span
      {...props}
      style={{ backgroundColor: color.surfaceElevated, border: `1px solid ${color.border}`, borderRadius: sharedStyles.radius.full, color: color.textMuted, display: 'inline-flex', fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize.xs, fontWeight: typographyTokens.fontWeight.medium, lineHeight: 1, padding: `${spacingTokens[1]} ${spacingTokens[1]}`, ...style }}
    >
      {children}
    </span>
  )
}
