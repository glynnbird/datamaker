const date_iso = require('./date_iso.js')

module.exports = (min, max) => {
  const d = date_iso(min, max)
  const parts = d.split('T')
  return parts[0]
}
