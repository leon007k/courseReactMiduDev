import PropTypes from "prop-types";
import { Filters } from "./Filters"

export function Header() {
  return (
    <header>
      <h1>React Shop</h1>
      <Filters />
    </header>
  )
}

Header.propTypes = {
  changeFilters: PropTypes.func
}

