import { useId } from 'react'
import { useFilters } from "../hooks/useFilters";
import './Filter.css'

export function Filters() {
  const { minPrice, setFilter } = useFilters()

  // * Estado que mostrara el precio minimo seleccionado. Se comenta porque este es un estado local y crea dos fuentes de la verdad
  //const [minPrice, setMinPrice] = useState(0)

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = event => {
    const getMinPrice = event.target.value
    //setMinPrice(getMinPrice)
    // ! AQUI ALGO HUELE MAL --> hay dos fuentes de la verdad
    setFilter(prevState => ({
      ...prevState,
      minPrice: getMinPrice
    }))
  }

  const handleChangeCategories = event => {
    const getCategories = event.target.value
    // ! AQUI ALGO HUELE MAL --> hay error de vulto
    setFilter(prevState => ({
      ...prevState,
      category: getCategories
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
          value={minPrice} />
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategories}>
          <option value="all">Todas</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  )
}