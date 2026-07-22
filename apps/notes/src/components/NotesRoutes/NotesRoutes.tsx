import { Route, Routes } from 'react-router-dom'
import { notesArticleRouteNames } from '@portfolio/config/routes'
import { ArticlePage } from '../../ArticlePage'
import { NotesIndex } from '../../NotesIndex'
import { NotesShell } from '../../NotesShell'
import { notesRouterPath } from '../../routes'

export function NotesRoutes() {
  return (
    <NotesShell>
      <Routes>
        <Route path={notesRouterPath('notes')} element={<NotesIndex />} />
        {notesArticleRouteNames.map((routeName) => <Route element={<ArticlePage routeName={routeName} />} key={routeName} path={notesRouterPath(routeName)} />)}
        <Route path="*" element={<ArticlePage />} />
      </Routes>
    </NotesShell>
  )
}
