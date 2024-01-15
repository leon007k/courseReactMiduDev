import { CAT_ENDPOINT_RANDOM_FACT } from '../constants.js'

export const getRandomFact = async () => {
  const result = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await result.json()
  const { fact } = data
  return fact
}