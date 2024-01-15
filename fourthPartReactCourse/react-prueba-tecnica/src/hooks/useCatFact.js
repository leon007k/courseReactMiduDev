import { useEffect, useState } from "react";
import { getRandomFact } from "../services/fact";

export function useCatFact() {
  const [fact, setFact] = useState('');

  // * Information request to the first API
  const refreshFact = () => {
    getRandomFact().then(newfact => setFact(newfact));
  };

  // * Recover appointment when loading page
  useEffect(refreshFact, []);

  return { fact, refreshFact };
}