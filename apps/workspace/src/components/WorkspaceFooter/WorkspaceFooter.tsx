import { breakpointTokens, spacingTokens, typographyTokens } from '@portfolio/tokens'
import { LinkButton, type Theme, useTheme } from '@portfolio/ui'
import { route } from '../../routes'

export interface WorkspaceFooterProps {
  theme: Theme
}

export function WorkspaceFooter({ theme }: WorkspaceFooterProps) {
  const { color } = useTheme(theme)

  return (
    <footer style={{ borderTop: `1px solid ${color.border}`, padding: `${spacingTokens[3]} ${spacingTokens[3]} ${spacingTokens[4]}` }}>
      <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: spacingTokens[2], justifyContent: 'space-between', margin: '0 auto', maxWidth: breakpointTokens.xl }}>
        <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, margin: 0 }}>Workspace is a product-minded portfolio experience.</p>
        <LinkButton href={route('gateway')} theme={theme} variant="ghost">All experiences</LinkButton>
      </div>
    </footer>
  )
}
