import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { restoreStaticRoute } from '@portfolio/routes'
import { App } from './App'
import './styles.css'

restoreStaticRoute()

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
