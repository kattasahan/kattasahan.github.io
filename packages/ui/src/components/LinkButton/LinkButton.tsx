import type { AnchorHTMLAttributes } from 'react'
import { buttonStyle, type ButtonVariant } from '../../lib/buttonStyles'
import { focusRing } from '../../lib/focus'
import { type Theme, useTheme } from '../../theme'

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?: Theme
  variant?: ButtonVariant
  fullWidth?: boolean
}

export function LinkButton({ children, fullWidth = false, style, theme, variant = 'primary', ...props }: LinkButtonProps) {
  const { color } = useTheme(theme)

  return (
    <a
      {...props}
      style={{ ...buttonStyle(color, variant), width: fullWidth ? '100%' : undefined, ...style }}
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
      {children}
    </a>
  )
}
