import './App.css'
import { Router } from './Router'
import Page404 from './pages/Page404'
import { HomePage } from './pages/Home.jsx'
import { AboutPage } from './pages/About'
import { SearchPage } from './pages/Search'
import { Route } from './Route.jsx'

const appRoutes = [
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
      <Router routes={appRoutes} defaultComponent={Page404} >
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
      </Router>
    </main>
  )
}

export default App
