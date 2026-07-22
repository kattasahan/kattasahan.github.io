import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import type { HTMLAttributes, ReactNode } from 'react'
import type { NavigationItem } from '../../lib/navigation'
import { type Theme, useTheme } from '../../theme'

export type { NavigationItem } from '../../lib/navigation'

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode
  items: NavigationItem[]
  theme?: Theme
  children?: ReactNode
}

export function Navbar({ brand, children, items, style, theme, ...props }: NavbarProps) {
  const { color } = useTheme(theme)

  return (
    <header
      {...props}
      style={{ alignItems: 'center', backgroundColor: color.background, borderBottom: `1px solid ${color.border}`, color: color.text, display: 'flex', fontFamily: typographyTokens.fontFamily.sans, gap: spacingTokens[2], justifyContent: 'space-between', padding: `${spacingTokens[2]} ${spacingTokens[3]}`, ...style }}
    >
      <div>{brand}</div>
      <nav aria-label="Primary navigation">
        <ul style={{ display: 'flex', gap: spacingTokens[2], listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item) => (
            <li key={item.href}>
              <a aria-current={item.current ? 'page' : undefined} href={item.href} style={{ color: item.current ? color.text : color.textMuted, fontSize: typographyTokens.fontSize.sm, fontWeight: item.current ? typographyTokens.fontWeight.semibold : typographyTokens.fontWeight.regular, textDecoration: 'none' }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {children ? <div>{children}</div> : null}
    </header>
  )
}
