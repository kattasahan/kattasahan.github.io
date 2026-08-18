import english from './profile.en.json'
import japanese from './profile.ja.json'

export const languages = ['en', 'ja'] as const
export type Language = (typeof languages)[number]
export type PortfolioContent = typeof english

const contentByLanguage: Record<Language, PortfolioContent> = {
  en: english,
  ja: japanese,
}

export function getContent(language: Language): PortfolioContent {
  return contentByLanguage[language]
}
