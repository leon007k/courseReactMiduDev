import PropTypes from "prop-types";

// # Esta funcion nos permite generar el tablero con sus respectivas funciones
export const Square = ({ children, isSelected, updateBoard, index }) => {
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

// * Especificamos el tipo de props que aceptara este componente
Square.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool,
  updateBoard: PropTypes.func,
  index: PropTypes.number,
};

