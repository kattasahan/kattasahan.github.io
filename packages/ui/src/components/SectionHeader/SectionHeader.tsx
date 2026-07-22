import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import type { HTMLAttributes, ReactNode } from 'react'
import { type Theme, useTheme } from '../../theme'

export interface SectionHeaderProps extends HTMLAttributes<HTMLElement> {
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  action?: ReactNode
  theme?: Theme
}

export function SectionHeader({ action, description, eyebrow, style, theme, title, ...props }: SectionHeaderProps) {
  const { color } = useTheme(theme)

  return (
    <header {...props} style={{ alignItems: 'end', display: 'flex', gap: spacingTokens[3], justifyContent: 'space-between', ...style }}>
      <div>
        {eyebrow ? <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, letterSpacing: typographyTokens.letterSpacing.wide, margin: 0, textTransform: 'uppercase' }}>{eyebrow}</p> : null}
        <h2 style={{ color: color.text, fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize['4xl'], letterSpacing: typographyTokens.letterSpacing.tight, lineHeight: typographyTokens.lineHeight.tight, margin: eyebrow ? `${spacingTokens[1]} 0 0` : 0 }}>{title}</h2>
        {description ? <p style={{ color: color.textMuted, margin: `${spacingTokens[1]} 0 0`, maxWidth: '42rem' }}>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </header>
  )
}
