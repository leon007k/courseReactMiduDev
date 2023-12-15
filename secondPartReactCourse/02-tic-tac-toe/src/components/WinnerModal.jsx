import PropTypes from "prop-types";
import { Square } from "./Square.jsx"
import { resetGameStorage } from "../storage/index.js";

export function WinnerModal({ winner, resetGame }) {
  if (winner == null) return null
  const winnerText = winner ? 'Ganó: ' : 'Empate'
  const whoIsWinner = winner || '🥲';

  // * Si hay un empate o un ganador, se resetea el storage, para evitar que el juego continue
  resetGameStorage()

  return (
    <section className="winner">
      <div className="text">
        <h2>
          {winnerText}
        </h2>

        <header className="win">
          <Square>{whoIsWinner}</Square>
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}

WinnerModal.propTypes = {
  // * EL prop winner puede ser cualquiera de estos 3 tipos, dependiendo si hay un empate o ganador
  winner: PropTypes.oneOfType([PropTypes.object, PropTypes.bool, PropTypes.string]),
  resetGame: PropTypes.func.isRequired,
}