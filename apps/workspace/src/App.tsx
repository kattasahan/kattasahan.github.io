import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@portfolio/theme'
import { WorkspaceRoutes } from './components/WorkspaceRoutes/WorkspaceRoutes'
import { workspaceRouterBaseName } from './routes'

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={workspaceRouterBaseName}>
        <WorkspaceRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
