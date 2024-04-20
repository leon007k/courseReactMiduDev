import { useContext } from "react";
import { CartContext } from "../context/cart";

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  // * Verificamos que el producto exista en el carrito
  const checkProductInCart = product => {
    return context.cart.some(item => item.id === product.id)
  }

  return { context, checkProductInCart }
}
