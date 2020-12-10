const integer = require('./integer.js')
const cache = require('../cache.js')

module.exports = (local) => {
  let ip
  if (local === 'true') {
    ip = [192, 168, 1, integer(1, 253)].join('.')
  } else {
    ip = [integer(1, 253), integer(1, 253), integer(1, 253), integer(1, 253)].join('.')
  }
  cache.set('ip', ip)
  return ip
}
