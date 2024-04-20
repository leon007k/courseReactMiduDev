import PropTypes from "prop-types";
import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icon.jsx'
import { useCart } from "../hooks/useCart.js";
import { ALTERNATIVE_URL } from "../constants.js"

export function Products({ products }) {
  const { context, checkProductInCart } = useCart()
  const { addToCart, removeFromCart } = context

  // * Permite cambiar la imagen en caso de presentar fallas con la original
  const handleChangeImage = (event) => {
    event.target.src = ALTERNATIVE_URL
  }

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} onError={handleChangeImage} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button className={isProductInCart ? 'remove-from-cart' : 'add-to-cart'} onClick={() => {
                  isProductInCart
                    ? removeFromCart(product)
                    : addToCart(product)
                }}>
                  {isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

Products.propTypes = {
  products: PropTypes.array
}