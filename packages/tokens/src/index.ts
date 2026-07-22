/**
 * Framework-agnostic design tokens.
 *
 * Values use CSS-compatible units where a unit is required, while numeric
 * tokens (weights and stacking order) remain plain numbers for easy mapping
 * to any styling solution.
 */

export const colorTokens = {
  light: {
    background: '#ffffff',
    surface: '#f5f5f7',
    surfaceElevated: '#ffffff',
    text: '#1d1d1f',
    textMuted: '#6e6e73',
    textSubtle: '#86868b',
    textInverse: '#ffffff',
    border: '#d2d2d7',
    borderStrong: '#a1a1a6',
    focus: '#0066cc',
    overlay: 'rgb(0 0 0 / 48%)',
  },
  dark: {
    background: '#000000',
    surface: '#1d1d1f',
    surfaceElevated: '#2c2c2e',
    text: '#f5f5f7',
    textMuted: '#a1a1a6',
    textSubtle: '#86868b',
    textInverse: '#000000',
    border: '#424245',
    borderStrong: '#6e6e73',
    focus: '#2997ff',
    overlay: 'rgb(0 0 0 / 64%)',
  },
} as const

export type ColorTheme = keyof typeof colorTokens
export type ColorToken = keyof (typeof colorTokens)[ColorTheme]

export const typographyTokens = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.04em',
  },
} as const

/** The spacing scale uses an 8-point base unit. */
export const spacingTokens = {
  0: '0',
  1: '0.5rem',
  2: '1rem',
  3: '1.5rem',
  4: '2rem',
  5: '2.5rem',
  6: '3rem',
  8: '4rem',
  10: '5rem',
  12: '6rem',
  16: '8rem',
} as const

export const radiusTokens = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const

export const shadowTokens = {
  none: 'none',
  low: '0 1px 2px rgb(0 0 0 / 8%)',
  medium: '0 4px 12px rgb(0 0 0 / 12%)',
  high: '0 12px 32px rgb(0 0 0 / 16%)',
  overlay: '0 24px 64px rgb(0 0 0 / 24%)',
} as const

export const motionTokens = {
  duration: {
    instant: '0ms',
    fast: '120ms',
    normal: '200ms',
    slow: '320ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    enter: 'cubic-bezier(0, 0, 0, 1)',
    exit: 'cubic-bezier(0.3, 0, 1, 1)',
  },
  reduceMotion: '0ms',
} as const

export const zIndexTokens = {
  base: 0,
  raised: 10,
  sticky: 100,
  navigation: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
} as const

export const breakpointTokens = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
} as const

export const tokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  motion: motionTokens,
  zIndex: zIndexTokens,
  breakpoint: breakpointTokens,
} as const

export type Tokens = typeof tokens
