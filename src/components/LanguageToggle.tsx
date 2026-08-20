import { Languages } from 'lucide-react'
import type { Language } from '../data/content'

type LanguageToggleProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  label: string
}

export function LanguageToggle({ language, onLanguageChange, label }: LanguageToggleProps) {
  return (
    <button
      id="language-toggle"
      type="button"
      onClick={() => onLanguageChange(language === 'en' ? 'ja' : 'en')}
      aria-label={label}
      aria-pressed={language === 'ja'}
      className="grid size-11 place-items-center bg-transparent text-ink transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:hover:text-[#ff8a7d]"
    >
      <Languages aria-hidden="true" />
    </button>
  )
}
