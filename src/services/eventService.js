export const fetchEvents = async () => {
  const response = await fetch('/api/v1/events')
  const results = await response.json()
  return prepareData(results)
}

prepareData = arr => {
  return arr.map(item => ({
    id: `${item.id}`,
    title: `${item.title}`,
    date: `${item.date}`,
    time: `${item.time}`,
    description: `${item.description}`,
    venue: `${item.venue.name}`,
  }))
}
