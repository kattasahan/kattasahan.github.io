import english from '@/data/locales/profile.en.json'
import japanese from '@/data/locales/profile.ja.json'

/**
 * The single boundary between portfolio UI and its content source.
 *
 * This module intentionally reads local JSON today. Replacing these imports
 * with a CMS or API client later leaves consumers unchanged.
 */
export const languages = ['en', 'ja'] as const
export type Language = (typeof languages)[number]
export type PortfolioContent = typeof english

const contentByLanguage: Record<Language, PortfolioContent> = {
  en: english,
  ja: japanese,
}

export function getPortfolioContent(language: Language): PortfolioContent {
  return contentByLanguage[language]
}
