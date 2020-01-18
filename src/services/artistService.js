export const fetchArtists = async () => {
  const response = await fetch(
    '/api/v1/artists'
  )
  const results = await response.json()
  return results
}

export const fetchOne = async (url, id) => {
  const response = await fetch(`${url}${id}`)
  const result = await response.json()
  return result
}

export const fetchSearch = async url => {
  const response = await fetch(`${url}`)
  const result = await response.json()
  return result
}
