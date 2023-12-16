import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [enable, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect ', { enable })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      setPosition({
        x: clientX,
        y: clientY
      })
    }

    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }

    /*
      # CleanUp
     * Se ejecuta cuando el componente se desmonta y cuando cambian las dependencias
     * antes de ejecutar el efecto de nuevo 
     */
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enable])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.3,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px,${position.y}px)`
      }} />
      <button onClick={() => setEnabled(!enable)}>
        {enable ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </main>
  )
}

export default App
