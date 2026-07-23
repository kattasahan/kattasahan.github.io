import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { bootstrapTheme } from '@portfolio/theme'
import { App } from './App'
import { homeRouterBaseName } from './routes'
import './styles.css'

bootstrapTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={homeRouterBaseName}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
