const API_KEY = 'c6584e9f';

export const searchMovies = async ({ search }) => {
  if (search === '') return null;

  try {
    // * funcion encargada de buscar la pelicula en la api
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();
    const movies = json.Search;

    // * Mapeamos el resultado de la api para hacerla mas mantenible
    return movies?.map(movies => ({
      id: movies.imdbID,
      title: movies.Title,
      year: movies.Year,
      poster: movies.Poster
    }))
  } catch (error) {
    throw new Error('Error searching movies');
  }
} 