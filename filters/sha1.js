const crypto = require('node:crypto')
module.exports = (str) => {
  // sha1 hash the string
  return crypto.createHash('sha1').update(str).digest('hex')
}
