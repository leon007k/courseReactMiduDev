import { useCatFact } from "./hooks/useCatFact.js"
import { useCatImage } from "./hooks/useCatImage.js"
import './App.css'

export function App() {
  const { fact, refreshFact } = useCatFact()
  const { imgUrl } = useCatImage({ fact })

  // * Allow another request to click the button
  const handleGetRandomFact = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Imagenes randoms de gatitos!</h1>
      <button type="button" onClick={handleGetRandomFact}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        <img src={imgUrl} alt={`extracted using the first word for ${fact}`}></img>
      </section>
    </main>
  )
}