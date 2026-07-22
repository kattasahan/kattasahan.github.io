import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import { type Theme, useTheme } from '../theme'

export interface FieldProps {
  label: string
  hint?: string
  error?: string
  theme?: Theme
}

export function FieldMessage({ error, hint, id, theme }: Pick<FieldProps, 'error' | 'hint' | 'theme'> & { id: string }) {
  const { color } = useTheme(theme)
  if (!error && !hint) return null

  return (
    <p id={id} style={{ color: error ? color.text : color.textMuted, fontSize: typographyTokens.fontSize.sm, margin: `${spacingTokens[1]} 0 0` }}>
      {error ?? hint}
    </p>
  )
}
