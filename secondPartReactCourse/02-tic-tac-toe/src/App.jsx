import { useState } from "react";
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./storage/index.js";
import "./App.css";

function App() {
  // # estado que controla el tablero
  const [board, setBoard] = useState(() => {
    /* 
    * Revisamos si tenemos una partida guardada, para continuar
    * Se obtiene el localStorage aqui, para evitar volver lento el renderizado
    * Ya que de esta manera, esto solo se ejecutara 1 vez, y no cada vez que se renderice
    */
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  // # Estado que controla el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  });

  // # Estado para determinar el ganador
  // ! Null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);

  // # Estado que nos permitira controlar quien gana, y actualizar el turno
  const updateBoard = (index) => {
    // * Evitamos sobreescribir los campos
    if (board[index] || winner) return;

    // * actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // * Cambiamos el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // * Guardamos la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // * Revisar si tenemos un ganador o empate
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  };

  // # funcion para volver a empezar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  /*
   * con el _, index. Indicamos de manera explicita que no estare utilizando el valor del elemento
   * en la posicion actual Y solo me interesara el indice, el cual contiene el valor del array
   */
  return (
    <main className="board">
      <h1>Gatito</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
