import { EVENT } from './consts'

import { useEffect, useState, Children } from 'react'
import { match } from 'path-to-regexp'
import PropTypes from "prop-types";
import { getCurrentPath } from './utils/utils';

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    // * Ejecucion del evento personalizado que se creo
    window.addEventListener(EVENT.PUSHSTATE, onLocationChange)
    // * Ejecucion de evento para volver atras
    window.addEventListener(EVENT.POPSTATE, onLocationChange)

    // * Limpiamos el evento
    return () => {
      window.removeEventListener(EVENT.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENT.POPSTATE, onLocationChange)
    }
  }, [])

  let routesParams = {}

  // * se agregan las rutas desde el children del componente <Route />
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean) // ! se une la ruta de search(routes) con las obtenidas del <Route />

  // * Validamos que el path actual tenga similitud con el path de la const routes
  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // * hemos usado path-to-regexp
    // * para poder detectar rutas dinamicas
    // ! example: /search/:query <-- :query es una ruta dinamica
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // * guardar los parametros de la url que eran dinamicos
    // * y que hemos extraido  con path-to-regexp
    // * por ejemplo si la ruta es /search/:query
    // * y la url es /search/javascript
    // ! matched.params.query === 'javascript'
    routesParams = matched.params // example: {query: 'javascript'} // /search/javascript
    return true

  })?.Component

  return Page ?
    <Page routesParams={routesParams} /> :
    <DefaultComponent routesParams={routesParams} />
}

Router.propTypes = {
  children: PropTypes.array,
  routes: PropTypes.array,
  defaultComponent: PropTypes.func
}