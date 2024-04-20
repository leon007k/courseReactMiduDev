import { CART_ACTIONS_TYPES } from '../constants'

export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

// * actualiza el localStorage para el carrito
const updateStateAndLocalStorage = newState => {
  window.localStorage.setItem('cart', JSON.stringify(newState))
  return newState
}

/* export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTIONS_TYPES.ADD_TO_CART: {
      const { id } = actionPayload
      // * se verifica que el producto ya este agregado en el carrito, si lo esta, se aumenta su cantidad
      const productInCartindex = state.findIndex(item => item.id === id)

      if (productInCartindex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartindex].quantity += 1
        return updateStateAndLocalStorage(newState)
      }

      // * Si el producto no esta en el carrito, se agrega junto con su cantidad
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]

      return updateStateAndLocalStorage(newState)
    }

    case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      return updateStateAndLocalStorage(newState)
    }

    case CART_ACTIONS_TYPES.CLEAR_CART: {
      return updateStateAndLocalStorage([])
    }
  }

  return state
} */

// * Esta forma es mas escalabe que trabajarlo con el switch
const UPDATE_STATE_BY_ACTION = {
  [CART_ACTIONS_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    // * se verifica que el producto ya este agregado en el carrito, si lo esta, se aumenta su cantidad
    const productInCartindex = state.findIndex(item => item.id === id)

    if (productInCartindex >= 0) {
      // ! forma usando el structuredClone
      /* const newState = structuredClone(state)
      newState[productInCartindex].quantity += 1 */

      // ! forma sin usar el structuredClone, con spread operator y slice
      const newState = [
        // * copia de elementos hasta el indice, excluyendolo
        ...state.slice(0, productInCartindex),
        // * se modifica el valor que tiene quantity al indice
        {
          ...state[productInCartindex],
          quantity: state[productInCartindex].quantity + 1
        },
        // * se copia el resto de los elementos
        ...state.slice(productInCartindex + 1)
      ]

      return updateStateAndLocalStorage(newState)
    }

    // * Si el producto no esta en el carrito, se agrega junto con su cantidad
    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1
      }
    ]

    return updateStateAndLocalStorage(newState)
  },
  [CART_ACTIONS_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    return updateStateAndLocalStorage(newState)
  },
  [CART_ACTIONS_TYPES.CLEAR_CART]: () => {
    return updateStateAndLocalStorage([])
  }
}


// * Ejemplo usando un objeto
export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state

}