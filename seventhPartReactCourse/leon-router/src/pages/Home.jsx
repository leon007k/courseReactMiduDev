import { Link } from '../Link'

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un React Router desde cero</p>
      <Link to='/about' title='acerca de nosotros' >Ir a Sobre Nosotros</Link>
    </>
  )
}