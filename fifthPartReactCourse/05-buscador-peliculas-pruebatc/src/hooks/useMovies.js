import { useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({ search, sort }) => {
  const [error, setError] = useState(null);
  const [responseMovies, setResponseMovies] = useState([]) // * Estado inicial que recibe pelicula a buscar
  const previousSearch = useRef(search) // * se usa use ref para evitar que se haga la misma búsqueda dos veces seguidas.

  // * Caja Negra encargada de solicitar la lista de peliculas a la API
  const getMovies = useMemo(() => {
    /*
    * Se usa useMemo para evitar que esta funcion se ejecute varias veces
    * Se agrega parametro de search para poder dejar el useMemo, sin mas parametros y asi,
    * Conseguir que solo se genere una vez la funcion
     */
    return async ({ search }) => {
      if (search === previousSearch.current) return

      try {
        setError(null);
        previousSearch.current = search;
        const listOfMovies = await searchMovies({ search });
        setResponseMovies(listOfMovies);
      } catch (error) {
        setError(error.message);
      }
    }
  }, [])

  // * ordenamos por titulo si se activa la opcion
  const sortMovies = useMemo(() => {
    return sort
      ? [...responseMovies].sort((a, b) => a.title.localeCompare(b.title))
      : responseMovies
  }, [sort, responseMovies])

  return { movies: sortMovies, getMovies, errorToSearch: error }
}