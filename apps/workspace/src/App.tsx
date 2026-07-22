import { BrowserRouter } from 'react-router-dom'
import { WorkspaceRoutes } from './components/WorkspaceRoutes/WorkspaceRoutes'
import { workspaceRouterBaseName } from './routes'

export function App() {
  return <BrowserRouter basename={workspaceRouterBaseName}><WorkspaceRoutes /></BrowserRouter>
}
