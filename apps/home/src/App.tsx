import { Route, Routes } from 'react-router-dom'
import { publicRoutes, type PublicRoute } from '@portfolio/routes'
import { ThemeProvider, useTheme } from '@portfolio/theme'
import { HomeHeader } from './components/HomeHeader/HomeHeader'
import { HomeHero } from './components/HomeHero/HomeHero'
import { HomeJournal } from './components/HomeJournal/HomeJournal'
import { PerspectiveList } from './components/PerspectiveList/PerspectiveList'
import { homeContent } from './content'
import { homeRouterPath, route } from './routes'

function resolveContentRoute(routeName: string): string {
  if (!(routeName in publicRoutes)) {
    throw new Error(`Unknown portfolio content route: ${routeName}`)
  }

  return route(routeName as PublicRoute)
}

function HomeLanding() {
  const { theme } = useTheme()

  return (
    <div className="home">
      <HomeHeader resolveRoute={resolveContentRoute} />
      <HomeHero />
      <PerspectiveList resolveRoute={resolveContentRoute} theme={theme} />
      <HomeJournal resolveRoute={resolveContentRoute} theme={theme} />
      <footer className="home-footer">
        <p>{homeContent.home.footer}</p>
      </footer>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path={homeRouterPath('home')} element={<HomeLanding />} />
      </Routes>
    </ThemeProvider>
  )
}
