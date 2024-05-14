import { useEffect, useState } from 'react'
import './App.css'
import { EVENT } from './consts'


/*
  * Cambia url para la navegacion SPAs
  @ href nueva pagina a navegar
*/
function navigate(href) {
  // * Objeto que nos permite cambiar la url sin recargar
  window.history.pushState({}, '', href)

  // * Evento personalizado para avisar que hemos cambiado url
  const navigationEvent = new Event(EVENT.PUSHSTATE)

  window.dispatchEvent(navigationEvent)
}

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un React Router desde cero</p>
      <button onClick={() => navigate('/about')}>Ir a Sobre Nosotros</button>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://avatars.githubusercontent.com/u/78046399?v=4' alt='Foto de Leon' width='300' height='300' />
        <p>Hola! Me llamo Leonardo Andrade y estoy creando un clon de React Router</p>
      </div>
      <button onClick={() => navigate('/')}>Ir al Home</button>
    </>
  )
}

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
