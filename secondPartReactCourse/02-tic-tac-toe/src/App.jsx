import { useState } from "react";
import "./App.css";

const TURNS = {
  // @ Turnos
  X: "x",
  O: "o",
};

// # Combos que determinan un ganador
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// # Esta funcion nos permite generar el tablero con sus respectivas funciones
const Square = ({ children, isSelected, updateBoard, index }) => {
  // * mostramos visualmente, que turno es el que se encuentra activo
  const className = `square ${isSelected ? "is-selected" : ""}`;

  // * Ejecutamos la funcion que nos permitira actualizar los turnos y determinar el ganador
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  // * estado que controla el tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  // * Estado que controla el turno
  const [turn, setTurn] = useState(TURNS.X);

  // * Estado para determinar el ganador
  // ! Null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
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

  // * Estado que nos permitira controlar quien gana, y actualizar el turno
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

    // * Revisar si tenemos un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  /*
   * con el _, index. Indicamos de manera explicita que no estare utilizando el valor del elemento
   * Y solo me interesara el indice, el cual contiene el valor del array
   */

  return (
    <main className="board">
      <h1>Gatito</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
