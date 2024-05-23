import { Link } from '../Link'

export function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://avatars.githubusercontent.com/u/78046399?v=4' alt='Foto de Leon' width='300' height='300' />
        <p>Hola! Me llamo Leonardo Andrade y estoy creando un clon de React Router</p>
      </div>
      <Link to='/' title='pagina principal'>Ir al Home</Link>
    </>
  )
}