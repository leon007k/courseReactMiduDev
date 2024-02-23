import PropTypes from "prop-types";
import { createContext, useMemo } from "react";
import { useCartReducer } from "../hooks/useCartReducer";

// # 1.- crear contexto
export const CartContext = createContext()

// # 2.- crear provider
export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  const obj = useMemo(() => ({
    cart: state,
    addToCart,
    removeFromCart,
    clearCart
  }), [state])

  return (
    <CartContext.Provider value={obj}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node
}