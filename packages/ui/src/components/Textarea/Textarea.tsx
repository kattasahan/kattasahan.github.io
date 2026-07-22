import { useId, type TextareaHTMLAttributes } from 'react'
import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import { FieldMessage, type FieldProps } from '../../lib/FieldMessage'
import { focusRing } from '../../lib/focus'
import { sharedStyles, useTheme } from '../../theme'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export function Textarea({ error, hint, id, label, style, theme, ...props }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const messageId = `${textareaId}-message`
  const { color } = useTheme(theme)

  return (
    <label style={{ color: color.text, display: 'grid', fontFamily: typographyTokens.fontFamily.sans, gap: spacingTokens[1] }}>
      <span style={{ fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.medium }}>{label}</span>
      <textarea
        {...props}
        aria-describedby={error || hint ? messageId : props['aria-describedby']}
        aria-invalid={error ? true : undefined}
        id={textareaId}
        style={{ backgroundColor: color.surfaceElevated, border: `1px solid ${error ? color.borderStrong : color.border}`, borderRadius: sharedStyles.radius.md, color: color.text, font: 'inherit', minHeight: '7rem', padding: spacingTokens[1], resize: 'vertical', ...style }}
        onFocus={(event) => {
          Object.assign(event.currentTarget.style, focusRing(color.focus))
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          event.currentTarget.style.outline = ''
          event.currentTarget.style.outlineOffset = ''
          props.onBlur?.(event)
        }}
      />
      <FieldMessage error={error} hint={hint} id={messageId} theme={theme} />
    </label>
  )
}
