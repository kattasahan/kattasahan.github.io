import { useId, useState } from 'react'
import { spacingTokens } from '@portfolio/tokens'
import { Button } from '../Button/Button'
import type { NavbarProps } from '../Navbar/Navbar'
import { useTheme } from '../../theme'

export interface MobileNavProps extends Omit<NavbarProps, 'children'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function MobileNav({ brand, items, onOpenChange, open, style, theme, ...props }: MobileNavProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isOpen = open ?? uncontrolledOpen
  const { color } = useTheme(theme)
  const menuId = useId()

  function toggleMenu() {
    const nextOpen = !isOpen
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  return (
    <header {...props} style={{ backgroundColor: color.background, borderBottom: `1px solid ${color.border}`, ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: `${spacingTokens[2]} ${spacingTokens[3]}` }}>
        <div>{brand}</div>
        <Button aria-controls={menuId} aria-expanded={isOpen} onClick={toggleMenu} theme={theme} variant="ghost">Menu</Button>
      </div>
      {isOpen ? (
        <nav aria-label="Mobile navigation" id={menuId} style={{ padding: `0 ${spacingTokens[3]} ${spacingTokens[2]}` }}>
          <ul style={{ display: 'grid', gap: spacingTokens[1], listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((item) => <li key={item.href}><a aria-current={item.current ? 'page' : undefined} href={item.href} style={{ color: color.text, textDecoration: 'none' }}>{item.label}</a></li>)}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
