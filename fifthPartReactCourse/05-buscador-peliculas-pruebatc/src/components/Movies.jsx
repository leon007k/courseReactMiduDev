import PropTypes from "prop-types";

const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {
        movies.map(movie => (
          <li className="movie" key={movie.id}>
            <div className="movie-image__container">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="movie-text__container">
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
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
  movies: PropTypes.array
}

Movies.propTypes = {
  movies: PropTypes.array
}