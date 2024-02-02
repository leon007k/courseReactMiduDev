import { useContext } from "react"
import { FiltersContext } from "../context/filters"

export function useFilters() {
  // # 3.- Consumimos el useContext creado
  const { category, minPrice, setFilter } = useContext(FiltersContext)

  const filterProducts = products => {
    return products.filter(product => {
      return (product.price >= minPrice &&
        (
          category === 'all' ||
          product.category === category
        ))
    })
  }

  return { minPrice, setFilter, filterProducts }
}