import { useRef, useState, useEffect } from "react";

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstRendered = useRef(true);

  useEffect(() => {
    // * Se valida que sea la primera vez que se renderiza el elemento, para evitar mostrar el mensaje de error
    if (isFirstRendered.current) {
      isFirstRendered.current = search === '';
      return;
    }

    if (search === '') {
      setError('No se puede buscar una película vacia');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número');
      return;
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres');
      return;
    }

    setError(null);
  }, [search])

  return { search, error, updateSearch };
}