import { spacingTokens } from '@portfolio/tokens'
import type { HTMLAttributes } from 'react'
import { type NavigationItem } from '../../lib/navigation'
import { type Theme, useTheme } from '../../theme'
import { LinkButton } from '../LinkButton/LinkButton'

export interface ExperienceSwitcherProps extends HTMLAttributes<HTMLElement> {
  items: NavigationItem[]
  theme?: Theme
}

export function ExperienceSwitcher({ items, style, theme, ...props }: ExperienceSwitcherProps) {
  const { color } = useTheme(theme)

  return (
    <nav {...props} aria-label="Portfolio experiences" style={{ ...style }}>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: spacingTokens[1], listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.href}>
            <LinkButton aria-current={item.current ? 'page' : undefined} href={item.href} theme={theme} variant={item.current ? 'primary' : 'ghost'} style={{ color: item.current ? color.textInverse : color.text }}>
              {item.label}
            </LinkButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}
