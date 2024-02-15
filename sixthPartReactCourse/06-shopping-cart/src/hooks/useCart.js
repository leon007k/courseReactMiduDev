import { useContext } from "react";
import { CartContext } from "../context/cart";

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  const checkProductInCart = product => {
    return context.cart.some(item => item.id === product.id)
  }

  return { context, checkProductInCart }
}
