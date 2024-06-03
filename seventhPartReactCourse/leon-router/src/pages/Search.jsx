import { useEffect } from "react"
import PropTypes from "prop-types";
import { useQueryParams } from "../hooks/useQueryParams";


export function SearchPage({ routesParams }) {

  const { limit } = useQueryParams
  console.log(limit)

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

