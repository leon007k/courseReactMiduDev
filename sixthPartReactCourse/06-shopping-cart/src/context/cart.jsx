import PropTypes from "prop-types";
import { createContext, useState, useMemo } from "react";

// # 1.- crear contexto
export const CartContext = createContext()

// # 2.- crear provider
export function CartProvider({ children }) {
  // * Estado global que contendra los productos agregados al carrito
  const [cart, setCart] = useState([])

  const addToCart = product => {
    // * se verifica que el producto ya este agregado en el carrito, si lo esta, se aumenta su cantidad
    const productInCartindex = cart.findIndex(item => item.id === product.id)

    if (productInCartindex >= 0) {
      const newCart = structuredClone(cart)
      newCart[productInCartindex].quantity += 1
      return setCart(newCart)
    }

    // * Si el producto no esta en el carrito, se agrega junto con su cantidad
    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]))
  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const clearCart = () => {
    setCart([])
  }

  const obj = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart
  }), [cart])

  return (
    <CartContext.Provider value={obj}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node
}