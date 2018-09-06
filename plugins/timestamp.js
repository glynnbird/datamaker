module.exports = () => {
  const now = new Date().getTime()
  const r = Math.floor(Math.random() * now)
  return r.toString()
}
