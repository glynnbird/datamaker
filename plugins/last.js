const cache = require('../cache.js')

module.exports = (tag) => {
  return cache.get(tag)
}
