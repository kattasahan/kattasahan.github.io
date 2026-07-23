import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { restoreStaticRoute } from '@portfolio/routes'
import { bootstrapTheme, ThemeProvider } from '@portfolio/theme'
import { NotesRoutes } from './components/NotesRoutes/NotesRoutes'
import { notesRouterBaseName } from './routes'
import './styles.css'

restoreStaticRoute()
bootstrapTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={notesRouterBaseName}>
        <NotesRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
