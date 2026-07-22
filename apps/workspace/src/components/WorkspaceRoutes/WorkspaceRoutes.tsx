import { matchPath, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { workspaceRouteNames, type WorkspaceRoute } from '@portfolio/routes'
import { AppShell } from '../AppShell/AppShell'
import { WorkspaceRouteView } from '../WorkspaceRouteView/WorkspaceRouteView'
import { useRouteLoadingState } from '../../lib/useRouteLoadingState'
import { workspaceRouterPath } from '../../routes'

function CaseStudyRoute({ isLoading, onNavigate }: { isLoading: boolean; onNavigate: (route: WorkspaceRoute) => void }) {
  const { slug } = useParams()
  return <WorkspaceRouteView caseStudySlug={slug} isLoading={isLoading} onNavigate={onNavigate} routeName="workspaceCaseStudy" />
}

function WorkspaceRouteTree() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoading = useRouteLoadingState(location.key)
  const navigateToRoute = (route: WorkspaceRoute) => navigate(workspaceRouterPath(route))

  return (
    <AppShell activeRoute={getActiveRoute(location.pathname)} onNavigate={navigateToRoute}>
      <Routes>
        <Route path={workspaceRouterPath('workspace')} element={<WorkspaceRouteView isLoading={isLoading} onNavigate={navigateToRoute} routeName="workspace" />} />
        <Route path={workspaceRouterPath('workspaceWork')} element={<WorkspaceRouteView isLoading={isLoading} onNavigate={navigateToRoute} routeName="workspaceWork" />} />
        <Route path={workspaceRouterPath('workspaceCaseStudy')} element={<CaseStudyRoute isLoading={isLoading} onNavigate={navigateToRoute} />} />
        <Route path={workspaceRouterPath('workspaceAbout')} element={<WorkspaceRouteView isLoading={isLoading} onNavigate={navigateToRoute} routeName="workspaceAbout" />} />
        <Route path={workspaceRouterPath('workspaceContact')} element={<WorkspaceRouteView isLoading={isLoading} onNavigate={navigateToRoute} routeName="workspaceContact" />} />
        <Route path="*" element={<WorkspaceRouteView isLoading={isLoading} onNavigate={navigateToRoute} />} />
      </Routes>
    </AppShell>
  )
}

function getActiveRoute(pathname: string): WorkspaceRoute | undefined {
  return workspaceRouteNames.find((routeName) => matchPath({ end: true, path: workspaceRouterPath(routeName) }, pathname))
}

export function WorkspaceRoutes() {
  return <WorkspaceRouteTree />
}
