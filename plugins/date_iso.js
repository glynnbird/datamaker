module.exports = () => {
  const now = new Date().getTime()
  const r = Math.floor(Math.random() * now)
  const d = new Date(r)
  return d.toISOString()
}
