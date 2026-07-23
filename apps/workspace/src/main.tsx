import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { restoreStaticRoute } from '@portfolio/routes'
import { bootstrapTheme } from '@portfolio/theme'
import { App } from './App'
import './styles.css'

restoreStaticRoute()
bootstrapTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
