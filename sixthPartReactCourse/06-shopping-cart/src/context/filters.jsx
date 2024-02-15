import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

// # 1.- Crear el Context. Este es el que tenemos que consumir
export const FiltersContext = createContext(); // Solo se crea una vez, singleton

// # 2.- Crear el Provider, para proveer el contexto. Este nos provee acceso al contexto
export function FiltersProvider({ children }) {
  const [{ category, minPrice }, setFilter] = useState({
    category: 'all',
    minPrice: 0
  })

  const obj = useMemo(() => ({
    category,
    minPrice,
    setFilter
  }), [category, minPrice])

  return (
    <FiltersContext.Provider
      value={obj}>
      {children}
    </FiltersContext.Provider>
  )
}

FiltersProvider.propTypes = {
  children: PropTypes.node
}