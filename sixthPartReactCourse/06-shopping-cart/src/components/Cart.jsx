import { useId } from 'react'
import { ClearCartIcon, CartIcon } from './Icon'
import { useCart } from '../hooks/useCart'
import './Cart.css'
import { CartItem } from './CartItem'

export function Cart() {
  const cartCheckboxId = useId()
  const { context } = useCart()
  const { cart, clearCart, addToCart } = context

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />
      <aside className="cart">
        <ul>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))
          }
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}