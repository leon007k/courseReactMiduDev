import { useState } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({ search }) => {
  const [responseMovies, setResponseMovies] = useState([]) // * Estado inicial que recibe pelicula a buscar

  // * Caja Negra encargada de solicitar la lista de peliculas a la API
  const getMovies = async () => {
    const listOfMovies = await searchMovies({ search });
    setResponseMovies(listOfMovies);
  }

  return { movies: responseMovies, getMovies }
}