import { useEffect, useId, type ReactNode } from 'react'
import { spacingTokens, typographyTokens, zIndexTokens } from '@portfolio/tokens'
import { Button } from '../Button/Button'
import { sharedStyles, type Theme, useTheme } from '../../theme'

export interface ModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  title: string
  theme?: Theme
  closeLabel?: string
}

export function Modal({ children, closeLabel = 'Close dialog', onClose, open, theme, title }: ModalProps) {
  const { color } = useTheme(theme)
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      style={{ alignItems: 'center', backgroundColor: color.overlay, display: 'flex', inset: 0, justifyContent: 'center', padding: spacingTokens[3], position: 'fixed', zIndex: zIndexTokens.modal }}
    >
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        role="dialog"
        style={{ backgroundColor: color.surfaceElevated, borderRadius: sharedStyles.radius.xl, boxShadow: sharedStyles.shadow.overlay, color: color.text, maxWidth: '36rem', padding: spacingTokens[3], width: '100%' }}
      >
        <div style={{ alignItems: 'start', display: 'flex', gap: spacingTokens[2], justifyContent: 'space-between' }}>
          <h2 id={titleId} style={{ fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize['2xl'], margin: 0 }}>{title}</h2>
          <Button aria-label={closeLabel} onClick={onClose} theme={theme} variant="ghost">×</Button>
        </div>
        <div style={{ marginTop: spacingTokens[3] }}>{children}</div>
      </section>
    </div>
  )
}
