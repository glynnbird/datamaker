const crypto = require('node:crypto')
module.exports = (str) => {
  // sha256 hash the string
  return crypto.createHash('sha256').update(str).digest('hex')
}
