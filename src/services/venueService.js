export const fetchVenues = async () => {
  const response = await fetch('/api/v1/venues')
  const results = await response.json()
  return results
}

export const fetchOne = async id => {
  const response = await fetch(
    `/api/v1/venues/${id}`
  )
  const result = await response.json()
  return result
}
