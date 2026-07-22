import type { ButtonHTMLAttributes } from 'react'
import { buttonStyle, type ButtonVariant } from '../../lib/buttonStyles'
import { focusRing } from '../../lib/focus'
import { type Theme, useTheme } from '../../theme'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme
  variant?: ButtonVariant
  fullWidth?: boolean
  loading?: boolean
}

export function Button({ children, disabled, fullWidth = false, loading = false, style, theme, variant = 'primary', ...props }: ButtonProps) {
  const { color } = useTheme(theme)

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      style={{ ...buttonStyle(color, variant), opacity: disabled || loading ? 0.56 : 1, pointerEvents: loading ? 'none' : undefined, width: fullWidth ? '100%' : undefined, ...style }}
      onFocus={(event) => {
        Object.assign(event.currentTarget.style, focusRing(color.focus))
        props.onFocus?.(event)
      }}
      onBlur={(event) => {
        event.currentTarget.style.outline = ''
        event.currentTarget.style.outlineOffset = ''
        props.onBlur?.(event)
      }}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}
