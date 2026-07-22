import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import { Card, LinkButton, useTheme } from '@portfolio/ui'
import type { WorkspaceRoute } from '@portfolio/config/routes'
import { getWorkspaceRouteDefinition, route } from '../../routes'
import { SectionLayout } from '../SectionLayout/SectionLayout'

export interface WorkspaceRouteViewProps {
  caseStudySlug?: string
  isLoading: boolean
  routeName?: WorkspaceRoute
  onNavigate: (route: WorkspaceRoute) => void
}

export function WorkspaceRouteView({ caseStudySlug, isLoading, onNavigate, routeName }: WorkspaceRouteViewProps) {
  const { color, theme } = useTheme()

  if (isLoading) {
    return (
      <SectionLayout description="Preparing the Workspace shell." eyebrow="Workspace" title="Loading">
        <Card theme={theme}><p style={{ color: color.textMuted, margin: 0 }}>Loading placeholder</p></Card>
      </SectionLayout>
    )
  }

  if (!routeName) {
    return (
      <SectionLayout description="This route is not part of the Workspace experience." eyebrow="404" title="Page not found">
        <Card theme={theme}>
          <p style={{ color: color.textMuted, margin: 0 }}>404 placeholder</p>
          <LinkButton href={route('workspace')} onClick={(event) => { event.preventDefault(); onNavigate('workspace') }} style={{ marginTop: spacingTokens[2] }} theme={theme} variant="secondary">Return to Workspace</LinkButton>
        </Card>
      </SectionLayout>
    )
  }

  const definition = getWorkspaceRouteDefinition(routeName)

  return (
    <SectionLayout description={definition?.description ?? 'A Workspace route placeholder.'} eyebrow={definition?.label} title={caseStudySlug ? `${definition?.title}: ${caseStudySlug}` : definition?.title ?? 'Workspace'}>
      <Card theme={theme}>
        <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.lg, lineHeight: typographyTokens.lineHeight.relaxed, margin: 0 }}>
          This shared shell is ready for page content. The final experience will add content without changing the surrounding navigation, layout, loading, or error states.
        </p>
      </Card>
    </SectionLayout>
  )
}
