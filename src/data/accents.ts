export const accents = {
  cyan: { light: '#0369a1', dark: '#7dd3fc' },
  blue: { light: '#2563eb', dark: '#93c5fd' },
  violet: { light: '#7c3aed', dark: '#c4b5fd' },
  fuchsia: { light: '#a21caf', dark: '#f0abfc' },
  rose: { light: '#e11d48', dark: '#fda4af' },
  orange: { light: '#c2410c', dark: '#fdba74' },
  emerald: { light: '#047857', dark: '#6ee7b7' },
  black: { light: '#171717', dark: '#d4d4d4' },
  white: { light: '#525252', dark: '#ffffff' },
} as const

export type Accent = keyof typeof accents

export const defaultAccent: Accent = 'cyan'

export function isAccent(value: string | null): value is Accent {
  return value !== null && value in accents
}
