import { useEffect, useState } from 'react'
import './App.css'
import { EVENT } from './consts'
import { HomePage } from './pages/Home.jsx'
import { AboutPage } from './pages/About'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    // * Ejecucion del evento personalizado que se creo
    window.addEventListener(EVENT.PUSHSTATE, onLocationChange)
    // * Ejecucion de evento para volver atras
    window.addEventListener(EVENT.POPSTATE, onLocationChange)

    // * Limpiamos el evento
    return () => {
      window.addEventListener(EVENT.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENT.POPSTATE, onLocationChange)
    }
  }, [])

  // ! Al trabajar el renderizado con condicionales, estariamos creando una MPAs(Multi Page Application)
  return (
    <main>
      {currentPath == '/' && <HomePage />}
      {currentPath == '/about' && <AboutPage />}
    </main>
  )
}

export default App
