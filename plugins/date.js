const dateiso = require('./date_iso.js')

module.exports = (min, max) => {
  const d = dateiso(min, max)
  const parts = d.split('T')
  return parts[0]
}
