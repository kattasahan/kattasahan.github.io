import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NotesRoutes } from './components/NotesRoutes/NotesRoutes'
import { notesRouterBaseName } from './routes'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter basename={notesRouterBaseName}><NotesRoutes /></BrowserRouter></StrictMode>)
