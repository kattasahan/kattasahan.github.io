import type { MouseEvent } from 'react'
import { spacingTokens } from '@portfolio/tokens'
import { type Theme } from '@portfolio/theme'
import { LinkButton } from '@portfolio/ui'
import type { WorkspaceRoute } from '@portfolio/routes'
import { route, workspaceRouteDefinitions } from '../../routes'

export interface WorkspaceNavigationProps {
  activeRoute?: WorkspaceRoute
  onNavigate: (route: WorkspaceRoute) => void
  theme: Theme
}

function shouldHandleNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

export function WorkspaceNavigation({ activeRoute, onNavigate, theme }: WorkspaceNavigationProps) {
  return (
    <nav aria-label="Workspace navigation" style={{ marginBottom: spacingTokens[5] }}>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacingTokens[1],
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {workspaceRouteDefinitions.map((item) => {
          const href = route(item.route)
          return (
            <li key={item.route}>
              <LinkButton
                aria-current={activeRoute === item.route ? 'page' : undefined}
                href={href}
                onClick={(event) => {
                  if (!shouldHandleNavigation(event)) return
                  event.preventDefault()
                  onNavigate(item.route)
                }}
                theme={theme}
                variant={activeRoute === item.route ? 'primary' : 'ghost'}
              >
                {item.label}
              </LinkButton>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
