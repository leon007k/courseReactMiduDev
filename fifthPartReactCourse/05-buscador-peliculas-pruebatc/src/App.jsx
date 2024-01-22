import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from "just-debounce-it"

function App() {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies: mappedMovies, getMovies } = useMovies({ search, sort })
  /* const inputRef = useRef() */

  // # Evita que se haga la búsqueda continuamente al escribir(debounce)
  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 300)
    ,
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleShort = () => {
    setSort(!sort)
  }

  // * Manera controlada: lo hace mas lento, porque cada vez que se actualiza, se renderiza cada ves
  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(newQuery)
    // # Haz que la búsqueda se haga automáticamente al escribir
    debounceGetMovies(newQuery)
  }

  // * Manera con useRef
  /*  const handleSubmitRef = (event) => {
     event.preventDefault()
     const inputEl = inputRef.current
     const value = inputEl.value
     console.log(value)
   } */

  // * manera no controlada: es mas rapida y optima
  /* const handleSubmitNotControlled = (event) => {
    event.preventDefault()
    // * manera de recuperar solo un valor de un input
    const fields = new window.FormData(event.target)
    const queryOne = fields.get('query')
    console.log(queryOne)

    // * Manera de recuperar todos los inputs
    const { query } = Object.fromEntries(
      new window.FormData(event.target)
    )
    console.log(query)
  } */

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <div className='search-container'>
          <form className="form" onSubmit={handleSubmit}>
            {/* <input ref={inputRef} name='query' placeholder="Avengers, Star Wars, Transformers..." /> */}
            <input onChange={handleChange} value={search} name='query' placeholder="Avengers, Star Wars, Transformers..." />
            <input type="checkbox" onChange={handleShort} checked={sort} />
            <button type="submit">Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App
