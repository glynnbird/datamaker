const letters = require('./letters.js')
const crypto = require('crypto')

module.exports = (count) => {
  const str = letters(100)
  return crypto.createHash('md5').update(str).digest('hex')
}
