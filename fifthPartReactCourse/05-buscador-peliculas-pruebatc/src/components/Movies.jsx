import PropTypes from "prop-types";

const ListOfMovies = ({ movies }) => {
  return (
    <ul>
      {
        movies.map(movie => (
          <li key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))
      }
    </ul>
  )
}

const NotMoviesFound = () => {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export const Movies = ({ movies }) => {
  const hasNotMovies = movies?.length > 0


  return (
    hasNotMovies
      ? <ListOfMovies movies={movies} />
      : <NotMoviesFound />
  )
}

ListOfMovies.propTypes = {
  movies: PropTypes.object
}

Movies.propTypes = {
  movies: PropTypes.object
}