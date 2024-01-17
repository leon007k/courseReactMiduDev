import listOfMovies from './mocks/with-results.json'
import './App.css'
import { Movies } from './components/movies'

function App() {

  const movies = listOfMovies.Search

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <div>
          <form className="form">
            <input placeholder="Avengers, Star Wars, Transformers..." />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
