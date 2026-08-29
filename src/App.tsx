import { useEffect, type CSSProperties } from 'react'
import { AccentColorToggle } from '@/shell/components/AccentColorToggle'
import { LanguageToggle } from '@/shell/components/LanguageToggle'
import { ThemeToggle } from '@/shell/components/ThemeToggle'
import { accents } from '@/data/accents'
import { getPortfolioContent } from '@/data/repositories/portfolioRepository'
import { AppRoutes } from '@/routes'
import { useAccentPreference } from '@/shell/hooks/useAccentPreference'
import { useLanguagePreference } from '@/shell/hooks/useLanguagePreference'
import { useThemePreference } from '@/shell/hooks/useThemePreference'

function App() {
  const { theme, updateTheme } = useThemePreference()
  const { language, updateLanguage } = useLanguagePreference()
  const { accent, updateAccent } = useAccentPreference()
  const content = getPortfolioContent(language)
  const accentColors = accents[accent]

  useEffect(() => {
    document.documentElement.lang = content.locale
    document.title = content.metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.metadata.description)
  }, [content])

  return (
    <main
      id="main-content"
      data-theme={theme}
      className="group min-h-screen bg-canvas text-ink data-[theme=dark]:bg-[#0a0a0a] data-[theme=dark]:text-neutral-50"
      style={{ '--color-accent': accentColors.light, '--color-accent-dark': accentColors.dark } as CSSProperties}
    >
      <nav aria-label={content.ui.controlsLabel} className="absolute right-2 top-2 z-10 flex items-center gap-1">
        <AccentColorToggle accent={accent} onAccentChange={updateAccent} label={content.ui.accent.label} options={content.ui.accent.options} />
        <LanguageToggle language={language} onLanguageChange={updateLanguage} label={content.ui.language.switchTo} />
        <ThemeToggle theme={theme} onThemeChange={updateTheme} labels={content.ui.theme} />
      </nav>
      <AppRoutes content={content} />
    </main>
  )
}

export default App
