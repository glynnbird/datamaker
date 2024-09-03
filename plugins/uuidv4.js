const crypto = require('crypto')

module.exports = (length) => {
  return crypto.randomUUID()
}
