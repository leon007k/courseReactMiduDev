import { getCurrentSearch } from "../utils/utils"

export function useQueryParams({ req } = {}) {
  const isServer = typeof window === "undefined"
  if (isServer) {
    const { query } = req
    return query
  }

  const search = getCurrentSearch()
  const params = new URLSearchParams(search)
  return Object.fromEntries(params.entries())
}