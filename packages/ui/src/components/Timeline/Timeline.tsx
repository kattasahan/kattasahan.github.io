import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import type { HTMLAttributes, ReactNode } from 'react'
import { sharedStyles, type Theme, useTheme } from '../../theme'

export interface TimelineItem {
  date: ReactNode
  title: ReactNode
  description?: ReactNode
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[]
  theme?: Theme
}

export function Timeline({ items, style, theme, ...props }: TimelineProps) {
  const { color } = useTheme(theme)

  return (
    <ol {...props} style={{ borderLeft: `1px solid ${color.border}`, display: 'grid', gap: spacingTokens[3], listStyle: 'none', margin: 0, padding: `0 0 0 ${spacingTokens[3]}`, ...style }}>
      {items.map((item, index) => (
        <li key={index} style={{ position: 'relative' }}>
          <span aria-hidden="true" style={{ backgroundColor: color.text, borderRadius: sharedStyles.radius.full, height: '0.625rem', left: 'calc(-1 * 1.8125rem)', position: 'absolute', top: '0.375rem', width: '0.625rem' }} />
          <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, margin: 0 }}>{item.date}</p>
          <h3 style={{ fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize.lg, margin: `${spacingTokens[1]} 0 0` }}>{item.title}</h3>
          {item.description ? <div style={{ color: color.textMuted, marginTop: spacingTokens[1] }}>{item.description}</div> : null}
        </li>
      ))}
    </ol>
  )
}
