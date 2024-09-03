const crypto = require('node:crypto')
module.exports = (str) => {
  // sha512 hash the string
  return crypto.createHash('sha512').update(str).digest('hex')
}
