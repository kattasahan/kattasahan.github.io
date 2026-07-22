import { AppShell } from './components/AppShell/AppShell'
import { WorkspaceRouteView } from './components/WorkspaceRouteView/WorkspaceRouteView'
import { useWorkspaceRouter } from './lib/useWorkspaceRouter'

export function App() {
  const { isLoading, navigate, route } = useWorkspaceRouter()

  return (
    <AppShell activeRoute={route?.route} onNavigate={navigate}>
      <WorkspaceRouteView currentRoute={route} isLoading={isLoading} />
    </AppShell>
  )
}
