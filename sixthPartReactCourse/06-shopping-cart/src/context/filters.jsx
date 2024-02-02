import PropTypes from "prop-types";
import { createContext, useState } from "react";

// # 1.- Crear el Context. Este es el que tenemos que consumir
export const FiltersContext = createContext(); // Solo se crea una vez, singleton

// # 2.- Crear el Provider, para proveer el contexto. Este nos provee acceso al contexto
export function FiltersProvider({ children }) {
  const [{ category, minPrice }, setFilter] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider
      value={{
        category,
        minPrice,
        setFilter
      }}>
      {children}
    </FiltersContext.Provider>
  )
}

FiltersProvider.propTypes = {
  children: PropTypes.node
}