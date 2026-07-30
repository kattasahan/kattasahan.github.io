import { useState } from 'react'
import { useTheme } from '@portfolio/theme'
import { homeContent } from '../../content'

export interface HomeHeaderProps {
  resolveRoute: (route: string) => string
}

export function HomeHeader({ resolveRoute }: HomeHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { navigation, site } = homeContent
  const themeToggle = navigation.themeToggle
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const themeLabel = theme === 'light' ? themeToggle.darkLabel : themeToggle.lightLabel
  const themeAction =
    theme === 'light' ? themeToggle.switchToDarkLabel : themeToggle.switchToLightLabel

  return (
    <header className="home-header">
      <a aria-label={site.name} className="home-header__brand" href={resolveRoute('home')}>
        {site.name
          .split(' ')
          .map((namePart) => namePart.slice(0, 1))
          .join('')}
      </a>
      <div className="home-header__controls">
        <nav
          aria-label={navigation.ariaLabel}
          className="home-header__nav"
          data-open={menuOpen}
          id="home-primary-navigation"
        >
          {navigation.items.map((item) => (
            <a href={resolveRoute(item.route)} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          aria-label={themeAction}
          className="home-header__theme-toggle"
          data-theme={nextTheme}
          onClick={toggleTheme}
          type="button"
        >
          {themeLabel}
        </button>
        <button
          aria-controls="home-primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? navigation.closeMenuLabel : navigation.menuLabel}
          className="home-header__menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? navigation.closeMenuLabel : navigation.menuLabel}
        </button>
      </div>
    </header>
  )
}
