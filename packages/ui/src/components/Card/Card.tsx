import { spacingTokens } from '@portfolio/tokens'
import type { HTMLAttributes } from 'react'
import { sharedStyles, type Theme, useTheme } from '../../theme'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  theme?: Theme
  padding?: keyof typeof spacingTokens
  elevated?: boolean
  as?: 'article' | 'div' | 'section'
}

export function Card({ as: Component = 'div', children, elevated = false, padding = 3, style, theme, ...props }: CardProps) {
  const { color } = useTheme(theme)

  return (
    <Component
      {...props}
      style={{ backgroundColor: color.surface, border: `1px solid ${color.border}`, borderRadius: sharedStyles.radius.lg, boxShadow: elevated ? sharedStyles.shadow.medium : sharedStyles.shadow.none, color: color.text, padding: spacingTokens[padding], ...style }}
    >
      {children}
    </Component>
  )
}
