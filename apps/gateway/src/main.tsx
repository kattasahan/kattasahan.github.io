import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { gatewayRouterBaseName } from './routes'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={gatewayRouterBaseName}><App /></BrowserRouter>
  </StrictMode>,
)
