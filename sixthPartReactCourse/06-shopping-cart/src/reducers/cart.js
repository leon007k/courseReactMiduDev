import { CART_ACTIONS_TYPES } from '../constants'

export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

// * actualiza el localStorage para el carrito
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTIONS_TYPES.ADD_TO_CART: {
      const { id } = actionPayload
      // * se verifica que el producto ya este agregado en el carrito, si lo esta, se aumenta su cantidad
      const productInCartindex = state.findIndex(item => item.id === id)

      if (productInCartindex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartindex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }

      // * Si el producto no esta en el carrito, se agrega junto con su cantidad
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTIONS_TYPES.CLEAR_CART: {
      updateLocalStorage(cartInitialState)
      return cartInitialState
    }
  }
}