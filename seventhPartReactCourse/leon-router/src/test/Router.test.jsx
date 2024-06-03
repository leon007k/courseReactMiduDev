import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { Router } from '../Router.jsx'
import { Route } from '../Route.jsx'
import { Link } from '../Link.jsx'
import { getCurrentPath } from '../utils/utils.js'

/*
 * npm install vitest -D --> Instalamos vitest, para poder hacer las pruebas unitarias 
 * npm install happy-dom @testing-library/react -D --> Nos permitira simular un arbol de elementos
 */

// * con esto, podremos emular la funcion getCurrentPath, indicando que es lo que nos devolveria
vi.mock('../utils/utils.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {

  beforeEach(() => {
    // ! Limpiar pantalla antes de ejecutar un test
    cleanup()
    vi.clearAllMocks()
  })

  it('should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route path={'/'} Component={() => {
          return (
            <>
              <h1>Home</h1>
              <Link to={'/about'}>Go to About</Link>
            </>
          )
        }}>
        </Route>
        <Route path={'/about'} Component={() => <h1>About</h1>} />
      </Router>
    )

    // click on the link --> doc: https://testing-library.com/docs/react-testing-library/example-intro
    const anchor = screen.getByText(/Go to About/)
    fireEvent.click(anchor) // allows you to fire events to simulate user actions

    const aboutTitle = await screen.findByText('About')

    // check that new route is rendered
    expect(aboutTitle).toBeTruthy()
  })

})