import { lazy, Suspense } from 'react'
import './App.css'
import { Router } from './Router.jsx'
import Page404 from './pages/Page404.jsx'
import { SearchPage } from './pages/Search.jsx'
import { Route } from './Route.jsx'

const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  // ! Al trabajar el renderizado con condicionales, estariamos creando una MPAs(Multi Page Application)
  /* return (
    <main>
      {currentPath == '/' && <HomePage />}
      {currentPath == '/about' && <AboutPage />}
    </main>
  ) */
  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404} >
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
