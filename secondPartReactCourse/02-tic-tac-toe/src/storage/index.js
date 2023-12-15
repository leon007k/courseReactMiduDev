export const saveGameToStorage = ({ board, turn }) => {
  // * Guardamos la partida
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn);
}

export const resetGameStorage = () => {
  // * borramos la partida guardada
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}