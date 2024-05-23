import PropTypes from "prop-types";
import { EVENT } from './consts'

/*
  * Cambia url para la navegacion SPAs
  @ href nueva pagina a navegar
*/
export function navigate(href) {
  // * Objeto que nos permite cambiar la url sin recargar
  window.history.pushState({}, '', href)

  // * Evento personalizado para avisar que hemos cambiado url
  const navigationEvent = new Event(EVENT.PUSHSTATE)

  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, title, ...props }) {
  const handleClick = (event) => {

    // * Permite que se pueda hacer uso del teclado al dar click en el link
    const isMainEvent = event.button === 0 // primary click o left click
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) //* Navegacion con SPA
    }
  }

  return <a onClick={handleClick} href={to} target={target} title={title} {...props} />
}

Link.propTypes = {
  target: PropTypes.string,
  to: PropTypes.string,
  title: PropTypes.string
}