module.exports = () => {
  const now = new Date().getTime()
  const r = Math.floor(Math.random() * now)
  const d = new Date(r).toISOString()
  const parts = d.split('T')
  return parts[1].split('.')[0]
}
