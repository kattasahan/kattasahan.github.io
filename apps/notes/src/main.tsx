import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotesIndex } from './NotesIndex'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><NotesIndex /></StrictMode>)
