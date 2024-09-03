const crypto = require('node:crypto')
module.exports = (str) => {
  // md5 hash the string
  return crypto.createHash('md5').update(str).digest('hex')
}
