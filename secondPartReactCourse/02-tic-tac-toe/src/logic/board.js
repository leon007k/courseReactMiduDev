import { WINNER_COMBOS } from "../constants.js";

// # Funcion que nos permitira determinar el ganador
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] &&
      boardToCheck[b] == boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // ! No tenemos ganador
  return null;
};

// # Funcion que nos permitira detectar si hay un empate
export const checkEndGame = (newBoard) => {
  // * Se revisa sino hay mas espacios vacios en el tablero
  return newBoard.every((square) => square != null)
}