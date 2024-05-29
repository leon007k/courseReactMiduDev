import { useEffect } from "react"
import PropTypes from "prop-types";


export function SearchPage({ routesParams }) {

  useEffect(() => {
    document.title = `Has buscado ${routesParams.query}`
  }, [])

  return (
    <h1>Has buscado {routesParams.query}</h1>
  )
}

SearchPage.propTypes = {
  routesParams: PropTypes.object
}

