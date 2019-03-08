const kuuid = require('kuuid')
const dateiso = require('./date_iso.js')

module.exports = (min, max) => {
  const d = dateiso(min, max)
  return kuuid.idr(d)
}
